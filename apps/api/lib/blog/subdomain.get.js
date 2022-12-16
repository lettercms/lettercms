import blogs from '@lettercms/models/blogs';
import {findOne} from '@lettercms/utils/lib/findUtils';

export default async function GetBlog() {
  const {
    req: {
      subdomain,
      query
    },
    res
  } = this;

  const data = await findOne(blogs, {subdomain}, query);

  res.json(data);
};