import posts from '@lettercms/models/posts';
import updateTags from './updateTags';
import updateCategories from './updateCategories';

export default async function() {
  const {
    req: {
      body,
      account,
      subdomain
    },
    res
  } = this;

  const id = await posts.createPost(subdomain, {author: account, ...body});

  updateTags(subdomain, [], body.tags);
  updateCategories(subdomain, null, body.category);

  res.json({
    status: 'OK',
    id
  });
};
