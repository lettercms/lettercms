import pages from '@lettercms/models/pages';
import usage from '@lettercms/models/usages';

import {isValidObjectId} from 'mongoose';

export default async function() {
  const {req, res} = this;

  const {url} = req.query;
  const {subdomain} = req;

  const isId = isValidObjectId(url);

  let deleteCondition = {};

  if (isId)
    deleteCondition._id = url;
  else {
    deleteCondition.url = url;
    deleteCondition.subdomain = subdomain;
  }

  await pages.deleteOne(deleteCondition);
  await usage.updateOne({subdomain}, {$inc: {pages: -1}});

  res.json({
    status: 'OK'
  });
};
