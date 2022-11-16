import postsModel from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import '@lettercms/models/accounts';
import {find} from '@lettercms/utils/lib/findHelpers/posts';

export default async function GetSinglePost() {
  const {
    req: {
      subdomain,
      query
    },
    res
  } = this;

  const condition = {
    subdomain
  };

  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'url mainUrl');

  if (query.status)
    condition.postStatus = query.status;

  const posts = await find(postsModel, condition, {
    ...query,
    urlID,
    mainUrl
  });

  res.json(posts);
};