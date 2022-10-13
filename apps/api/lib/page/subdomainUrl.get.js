import pages from '@lettercms/models/pages';
import {isValidObjectId} from 'mongoose';
import {findOne} from '@lettercms/utils/lib/findUtils';

export default async function() {
  const {req: {
    subdomain,
    query
  }, res} = this;

  const {url} = query;

  let data;
  const isId = isValidObjectId(url);

  if (isId)
    data = await findOne(pages, {_id: url}, query);

  if (data === null)
    data = await findOne(pages, {url, subdomain}, query);

  if (data === null)
    res.sendStatus(404);
  else
    res.json(data);
};
