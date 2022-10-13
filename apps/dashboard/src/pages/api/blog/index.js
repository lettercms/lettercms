import { withSentry } from '@sentry/nextjs';
import {getBlog, getRecommended} from '@/lib/mongo/blogs';

async function blog(req, res) {
  const {userID, page} = req.query;

  let data = {};
  if (userID) {
    data = await getRecommended(userID, page);
  } else {
    data = await getBlog(page);
  }

  res.json(data);
}

export default withSentry(blog);