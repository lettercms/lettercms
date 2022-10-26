import blogs from '@lettercms/models/blogs';
import diffToMap from './diffToMap';

export default async function updateCategories(subdomain, prev, next) {
  if (!next)
    return Promise.resolve();

  const {tags} = await blogs.findOne({subdomain}, 'tags');

  const updatedTags = diffToMap(tags, prev, next);

  return blogs.updateOne({subdomain}, {tags: updatedTags});
}
