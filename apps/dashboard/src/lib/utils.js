import jwt from 'jsonwebtoken';

export const getOrigin = req => {
	if (req) {
		return req.protocol + '://' + req.host;
	}

	return location.origin;
};

export const getSubdomain = (req) => {
  const hostname = req.headers.get('host');

  const subdomain =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace('.lettercms-client.vercel.app', '')
      : hostname.replace('.localhost:3002', '');

  return subdomain;
};

export const generateToken = subdomain => jwt.sign({subdomain}, process.env.JWT_AUTH);
