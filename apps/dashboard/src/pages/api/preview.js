import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import { withSentry } from '@sentry/nextjs';

async function Preview(req, res) {
  const {id} = req.query;

  if (!id) {
    return res.status(401).json({ message: 'Invalid ID' });
  }

  await connect();

  const existsPost = await posts.exists({_id: id});

  if (!existsPost) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.setPreviewData({id}, {
     maxAge: 60
  });

  res.redirect(`/blog/${req.query.id}`);
}

export default withSentry(Preview);
