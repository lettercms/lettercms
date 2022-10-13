import blogs from '@lettercms/models/blogs';
import {find} from '@lettercms/utils/lib/findUtils';

export default async function() {
  const {
    req: {isAdmin, query, path},
    res
  } = this;

  if (!isAdmin)
    return res.sendStatus(404);

  const data = await find(blogs, {}, query);

  res.json(data);
};
