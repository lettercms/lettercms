import jwt from 'jsonwebtoken';

export default function GenerateToken(req, res) {
  if (req.method !== 'POST')
    return res.status(405);

  const hostname = req.headers.host || 'davidsdevel.lettercms.vercel.app';
  let subdomain = null;

  //Switch between staging and production
  if (hostname.startsWith('lettercms-client-'))
    subdomain = 'davidsdevel';
  else
    subdomain =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname.replace('.lettercms.vercel.app', '')
        : hostname.replace('.localhost:3002', '');

  const accessToken = jwt.sign({subdomain}, process.env.JWT_AUTH, {expiresIn: 1800});

  res.json({accessToken});
}
