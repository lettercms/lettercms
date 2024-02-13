import usage from '@lettercms/models/usages';
import jwt from 'jsonwebtoken';
import connect from '@lettercms/utils/lib/connection';

/**
 * Update file size and upload usage
 *
 * This feature will not be implemented on public API,
 * to avoid user directly manipulation 
 *
 */
export default async function patchUsage(req, res) {
  const {authorization} = req.headers;
  
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
  await connect();

  const {subdomain} = decoded;
  const {size} = req.body;

  try {
    await usage.updateOne({subdomain}, {$inc: {filesStorage: size, filesUpload: 1}});

    res.json({
      status: 'OK'
    });
  } catch(err) {

    res.statusCode = 500;

    res.json({
      status: 'Server Error'
    });

    throw err;
  }
}
