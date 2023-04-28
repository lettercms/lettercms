import cors from './cors';
import connect from './connection';
import blogs from '@lettercms/models/blogs';
//import usage from '@lettercms/models/usages';
import decodeToken from './decodeJwt';
import bcrypt from 'bcrypt';

/**
 * API Methods Wrapper Middleware
 *
 * Wrapper to handle API routes methods, this provide as modular API route
 * passing Request and Response methods via "functionName.bind({req, res})"
 *
 * This handler will validate auth headers and methods, connect to database,
 * clear QStash scheduler on each request
 * 
 * Every request will pass blog subdomain trhought request object, each handler
 * can access via "this.req.subdomain"
 *
 * @example
 * 
 * import GET from 'path/to/handler';
 * import manageMethods from '@lettercms/utils/lib/manageMethods';
 *
 * export default manageMethods({
 *   GET
 * });
 * 
 *
 */
export default function manageMethods(methods) {
  return async function handler(req, res) {
    try {

      //Added CORS Headers
      cors(req, res);

      //CORS preflight
      if (req.method === 'OPTIONS') {
        res.setHeader('Vary', 'Origin');
        res.setHeader('Content-Length', '0');
        
        res.statusCode = 200;

        return res.end();
      }

      //Get Auth headers from request
      const blogId = req.headers['x-lettercms-id'];
      const blogSecret = req.headers['x-lettercms-secret'];
      const accessToken = req.headers['authorization'];

      //Check API credentials
      if ((blogId && !blogSecret) || (!blogId && blogSecret))
        return res.status(400).json({
          status: 'bad-request',
          message: 'Please Provide a valid client ID and client Secret'
        });

      let pass = false;

      //Connect to database
      await connect(); 

      //Has API Key
      if (blogId && blogSecret) {
        const blog = await blogs.findOne({_id: blogId}, 'keys subdomain', {lean: true});

        if (!blog)
          return res.status(400).json({
            status: 'bad-request',
            message: 'Invalid Client ID'
          });

        const {keys, subdomain} = blog;

        req.subdomain = subdomain;

        const checks = await Promise.all(keys.map(e => bcrypt.compare(blogSecret, e.hash)));

        pass = checks.includes(true);
      }
      //Has Access Token
      else if (accessToken) {
        const {status, subdomain, account} = decodeToken(accessToken);

        if (!status && subdomain) {
          req.subdomain = subdomain;
          req.account = account;

          pass = true;
        }
      }
      //Is Public Path
      else {
        if (/\/api\/\w*\/exists\?/.test(req.url))
          pass = true;
      }

      if (!pass && accessToken)
        return res.status(401).json({
          message: 'Invalid Access Token'
        });

      if (!pass && blogId && blogSecret)
        return res.status(401).json({
          message: 'Invalid API credentials'
        });

      if (!pass && !req.headers['x-invoke-path'].endsWith('/exists'))
        return res.status(401).json({
          message: 'Unauthorized'
        });

      //Verify method on API route
      if (!(req.method in methods))
        return res.status(405).json({
          message: `Invalid method ${req.method}`
        });


      //Bind request and response Objects
      const methodFn = methods[req.method].bind({req, res});

      //Execute method handler
      await methodFn();
    } catch(err) {
      res.status(500).send({
        status: 'server-error'
      });

      throw err;
    }
  };
};
