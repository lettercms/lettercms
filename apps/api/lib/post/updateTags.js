import blogs from '@lettercms/models/blogs';

export default async function updateTags(subdomain, prev, next) {
  console.log(prev, next);

  if (!next)
    return Promise.resolve();

  const {tags} = await blogs.findOne({subdomain}, 'tags');

  const data = {};
  const diff = getDiff(prev, next);

  diff.toAdd.forEach(tag => {
    const count = tags.get(tag) || 0;

    tags.set(tag, count + 1);    
  });

  diff.toDelete.forEach(tag => {
    const count = tags.get(tag);

    let newCount = count - 1;

    if (newCount === 0)
      tags.delete(tag);
    else
      tags.set(tag, newCount); 
  });

  return blogs.updateOne({subdomain}, {$set: {tags}});
}

function getDiff(prev, next) {
  const toAdd = [];
  const toDelete = [];

  next.forEach(e => {
    if (!prev.includes(e))
      toAdd.push(e);
  });
  prev.forEach(e => {
    if (!next.includes(e))
      toDelete.push(e);
  });

  return {
    toAdd,
    toDelete
  };
}
