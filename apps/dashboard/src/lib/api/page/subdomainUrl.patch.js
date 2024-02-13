import pages from '@lettercms/models/pages';
import {isValidObjectId} from 'mongoose';

export default async function PatchPage() {
  const {req, res} = this;

  const {url} = req.query;
  const {action} = req.body;
  const {subdomain} = req;

  const isId = isValidObjectId(url);
  const updateCondition = {};

  if (isId)
    updateCondition._id = url;
  else {
    updateCondition.url = url;
    updateCondition.subdomain = subdomain;
  }

  let data;

  delete req.body.action;

  switch(action) {
    case 'publish':
      data = await pages.publishPage(updateCondition, req.body);
      break;
    case 'draft':
      data = await pages.draftPage(updateCondition, req.body);
      break;
    case 'update':
      data = await pages.updatePage(updateCondition, req.body);
      break;
    default:
      return res.status(400).json({
        message: `Unknow Action "${action}"`
      });
  }

  if (data.exists)
    return res.json({
      message: 'Url Exists'
    });

  res.json({
    status: 'OK',
    data
  });
};
