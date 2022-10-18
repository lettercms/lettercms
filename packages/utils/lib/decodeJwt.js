import jwt from 'jsonwebtoken';

export default function decode(token) {
  let decoded;
  
  try {
    decoded = jwt.verify(token, process.env.JWT_AUTH);
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

  return decoded;
}
