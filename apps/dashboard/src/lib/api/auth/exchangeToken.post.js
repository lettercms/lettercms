import blogs from '@lettercms/models/blogs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function exchange() {
  const {req, res} = this;

  const blogId = req.headers['x-lettercms-id'];
  const blogSecret = req.headers['x-lettercms-secret'];

  //Invalid API credentials
  if (!blogSecret || !blogId)
    return res.status(401).json({
      status: 'unauthorized',
      message: 'Please Provide a valid client ID and client Secret'
    });
    
  const blog = await blogs.findOne({_id: blogId}, 'keys subdomain', {lean: true});

  if (!blog)
    return res.status(400).json({
      status: 'bad-request',
      message: 'Invalid Client ID'
    });

  const {keys, subdomain} = blog;

  const checks = await Promise.all(keys.map(e => bcrypt.compare(blogSecret, e.hash)));

  const isValid = checks.includes(true);

  if (!isValid)
    return res.status(401).json({
      status: 'unauthorized',
      message: 'Invalid API credentials'
    });

  const accessToken = jwt.sign({subdomain}, process.env.JWT_AUTH, req.body);

  res.json({
    status: 'OK',
    accessToken
  });
}
