import blogs from '@lettercms/models/blogs';

export default async function updateCategories(subdomain, prev, next) {
  if (next === prev)
    return Promise.resolve();

  const {categories} = await blogs.findOne({subdomain}, 'categories');

  if (prev && prev !== 'null' && prev !== 'undefined') {
    const prevCount = categories.get(prev);
    categories.set(prev, prevCount - 1)
  }

  if (next && next !== 'null' && next !== 'undefined') {
    const nextCount = categories.get(next);
    categories.set(next, nextCount + 1)
  }

  return blogs.updateOne({subdomain}, {categories});
}
