import _sdk from '@lettercms/sdk';
import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';

async function Preview(req, res) {
  const {id} = req.query;
  
  let subdomain = null;
  const hostname = req.headers.host || 'davidsdevel.lettercms.vercel.app';

  //Switch between staging and production
  if (hostname.startsWith('lettercms-client-'))
    subdomain = 'davidsdevel';
  else
    subdomain =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname.replace('.lettercms.vercel.app', '')
        : hostname.replace('.localhost:3002', '');

  if (!id || !subdomain)
    return res.status(401).json({ message: 'Invalid ID' });

  await connect();

  const existsPost = await posts.exists({_id: id});

  if (!existsPost)
    return res.status(401).json({ message: 'Invalid slug' });

  res.setPreviewData({}, {
     maxAge: 60
  });

  res.redirect(`/${req.query.id}`);
}

export default Preview;
