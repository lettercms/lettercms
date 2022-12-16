import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {Ratings} from '@lettercms/models/users';
import {isValidObjectId} from 'mongoose';
import revalidate from '@lettercms/utils/lib/revalidate';
import {getFullUrl} from '@lettercms/utils/lib/posts';
import updateCategories from './updateCategories';

export default async function DeletePost() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain} = req;

  const isId = isValidObjectId(url);

  const deleteCondition = {};

  if (isId)
    deleteCondition._id = url;
  else {
    deleteCondition.url = url;
    deleteCondition.subdomain = subdomain;
  }

  const p = await posts.findOne(deleteCondition, 'url category published', {lean: true});
  const post = p._id;

  await posts.deletePost(deleteCondition);
  await Ratings.deleteMany({subdomain, post});
  
  updateCategories(subdomain, p.category, '');

  blogs.find({subdomain}, 'mainUrl url', {lean: true})
    .then(blog => {
      const _url = mainUrl + getFullUrl(p, blog.url);

      revalidate(subdomain, _url);
      revalidate(subdomain, e.mainUrl);
    });

  res.json({
    status: 'OK'
  });
};
