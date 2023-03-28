import blogs from '@lettercms/models/blogs';
import posts from '@lettercms/models/posts';

export default async function updateCategories(subdomain, newCategories) {

  const {categories} = await blogs.findOne({subdomain}, 'categories');

  const data = {};
  const diff = getDiff(categories, newCategories);

  if (diff.toAdd?.length > 0 || diff.toDelete?.length > 0) {
    diff.toAdd.forEach(cat => categories.set(cat, 0));

    diff.toDelete.forEach(async cat => {
      //Delete category count
      categories.delete(cat);
      //Delete category on entries
      await posts.updateMany({subdomain, category: cat}, {$set: {category: ''}});

      //TODO: Revalidate
    });

    return blogs.updateOne({subdomain}, {$set: {categories}});
  }

  return Promise.resolve();
}

function getDiff(prev, next) {
  const toAdd = [];
  const toDelete = [];

  next.forEach(e => {
    if (!prev.get(e))
      toAdd.push(e);
  });
  prev.forEach((_, e) => {
    if (!next.includes(e))
      toDelete.push(e);
  });

  return {
    toAdd,
    toDelete
  };
}
