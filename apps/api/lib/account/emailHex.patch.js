import {Accounts} from '@lettercms/models/accounts';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import revalidate from '@lettercms/utils/lib/revalidate';
import {getFullUrl} from '@lettercms/utils/lib/posts';
import {isValidObjectId} from 'mongoose';

export default async function() {
  const {
    req,
    res
  } = this;

  const {
    isAdmin,
    subdomain
  } = req;

  if (req.body.subdomain && !isAdmin)
    return res.status(403).json({
      message: 'Cannot change subdomain'
    });

  const {
    emailHex
  } = req.query;

  let condition = {};

  const isId = isValidObjectId(emailHex);

  if (isId)
    condition._id = emailHex;
  else
    condition.email = Buffer.from(emailHex, 'hex').toString('utf-8');

  const account = await Accounts.findOneAndUpdate(condition, req.body);

  if (
    req.body.name ||
    req.body.lastname ||
    req.body.description ||
    req.body.photo ||
    req.body.facebook ||
    req.body.instagram ||
    req.body.linkedin ||
    req.body.twitter ||
    req.body.website ||
    req.body.ocupation
  ) {
    Promise.all([
      posts.find({author: account._id, views: {$gt: 0}, postStatus: 'published'}, 'url category published', {lean: true}),
      blogs.find({subdomain}, 'mainUrl url', {lean: true})
    ])
    .then(([paths, blog]) => {
      paths.forEach(e => {
        const url = blog.mainUrl + getFullUrl(e, blog.url);

        revalidate(subdomain, url);
      });
    });
  }

  res.json({
    status: 'OK'
  });
};
