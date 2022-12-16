import posts from '@lettercms/models/posts';
import updateTags from './updateTags';

export default async function createPost() {
  const {
    req: {
      body,
      account,
      subdomain
    },
    res
  } = this;
  const id = await posts.createPost(subdomain, {author: account, ...body});
  updateTags([], body.tags);

  res.json({
    status: 'OK',
    id
  });
};
