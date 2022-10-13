import jwt from 'jsonwebtoken';

export default function CORS(req, res) {

  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');

  const {authorization} = req.headers;

  if (/\/api\/image\/\w*\/.*\.\w*$/.test(req.url))
    return true;

  if (/\/exists/.test(req.url)) {
    let q = req.query ? Object.keys(req.query) : [];

    if (q.length === 0)
      return {
        status: 'no-query',
        message: 'Path "exists" must have queries'
      };

    return true;
  }

  if (!authorization)
    return false;

  let decoded;
  
  try {
    decoded = jwt.verify(authorization, process.env.JWT_AUTH);
  } catch(err) {
    switch(err.message) {
      case 'jwt expired':
        return {
          status: 'token-error',
          message: 'Access Token expired'
        };
      case 'invalid token':
        return {
          status: 'token-error',
          message: 'Invalid Access Token'
        };
      case 'invalid signature':
        return {
          status: 'token-error',
          message: 'Unable to verify Access Token'
        };
      default:
        throw err;
    }
  }

  if (decoded.subdomain || decoded.isAdmin) {
    req.subdomain = decoded.subdomain;
    req.account = decoded.account;
    
    if (decoded.isAdmin)
      req.isAdmin = true;
    
    return true;
  }

  return false;
}
