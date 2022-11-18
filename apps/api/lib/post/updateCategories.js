import blogs from '@lettercms/models/blogs';

export default async function UpdateCategories(subdomain, prev, next) {
  console.log(prev, next);

  if (prev == next)
    return Promise.resolve();

  const {categories} = await blogs.findOne({subdomain}, 'categories', {lean: true});

  if (prev)
    categories[prev] = categories[prev] - 1;
  if (next)
    categories[next] = categories[next] + 1;

  return blogs.updateOne({subdomain}, {$set: {categories}});
}
