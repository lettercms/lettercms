import blogs from '@lettercms/models/blogs';

export default async function checkCategory(subdomain, category) {
  const {categories} = await blogs.findOne({subdomain}, 'categories', {lean: true});

  return category in categories;
}
