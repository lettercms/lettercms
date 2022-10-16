import {isValidObjectId} from 'mongoose';
import posts from '@lettercms/models/posts';
import pages from '@lettercms/models/pages';
import usage from '@lettercms/models/usages';

export default async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain, body} = req;

  const isId = isValidObjectId(url);

  const updateCondition = {};

  if (isId)
    updateCondition._id = url;
  else {
    updateCondition.url = url;
    updateCondition.subdomain = subdomain;
  }

  if (body.url) {
    const existsPage = await pages.exists({subdomain, url: req.body.url, pageStatus: 'published'});

    if (existsPage)
      return res.status(400).json({
        status: 'posts/url-mismatch',
        message: 'A page with same URL already exists'
      });

    const existsPublishedPost = await posts.exists({...updateCondition, postStatus: 'published'});
    if (existsPublishedPost)
      return res.status(400).json({
        status: 'posts/already-published',
        message: 'Post already published'
      });
  }

  await schedule(req.body.schedule, {
    url: `https://${process.env.VERCEL_URL}/api/post/${url}/publish`,
    token: jwt.sign({subdomain}, process.env.JWT_AUTH),
    body: req.body
  });

  await usage.updateOne({subdomain}, {$inc: {socialSchedule: 1}});

  res.json({
    status: 'OK',
    id: postID
  });
};
