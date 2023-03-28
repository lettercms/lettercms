import postsModel from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';

import {find} from '@lettercms/utils/lib/findHelpers/posts';

export default async function SearchPosts() {
  const {req: {subdomain, query, path}, res} = this;

  const {
    q,
    status,
    tag
  } = query;

  const conditions = {
    subdomain,
    $text: {$search: q}
  };

  if (status)
    conditions.postStatus = status;

  if (tag)
    conditions.tags = {
      $in: tag
    };

  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'url mainUrl');

  const posts = await find(postsModel, conditions, {
    ...query,
    mainUrl,
    urlID
  });

  res.json(posts);
};