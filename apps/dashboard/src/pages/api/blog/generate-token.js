import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/utils/lib/connection';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export default async function generateKey(req, res) {
  const {blogID: _id} = req.body;

  await connect();

  const existsBlog = await blogs.exists({_id});

  if (!existsBlog)
    return res.status(400).json({
      status: 'bad-request',
      message: 'Blog does not found'
    });

  const key = crypto.randomBytes(16).toString('hex');

  const tokenHash = await bcrypt.hash(key, 10);

  await blogs.updateOne({_id}, {tokenHash});

  res.json({
    status: 'OK',
    key: _id + key
  });
}
