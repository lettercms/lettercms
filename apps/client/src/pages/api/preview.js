import _sdk from '@lettercms/sdk';
import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import { withSentry } from '@sentry/nextjs';


async function Preview(req, res) {
  const {id} = req.query;
  
  const hostname = req.headers.host;
  const subdomain = process.env.NODE_ENV === 'production'  ? hostname.replace('.lettercms.vercel.app', '') : hostname.replace('.localhost:3002', '');
  
  if (!id || !subdomain) {
    return res.status(401).json({ message: 'Invalid ID' });
  }

  await connect();

  const existsPost = await posts.exists({_id: id});

  if (!existsPost) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({}, {
     maxAge: 60
  });

  res.redirect(`/${req.query.id}`);
}

export default withSentry(Preview);
