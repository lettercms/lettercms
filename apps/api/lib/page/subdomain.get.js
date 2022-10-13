import pagesModel from '@lettercms/models/pages';
import {find} from '@lettercms/utils/lib/findHelpers/pages';

export default async function() {
  const {req, res} = this;

  const {subdomain, path} = req;
  const {status} = req.query;

  const condition = {
    subdomain
  };

  if (status)
    condition.pageStatus = status;

  const pages = await find(pagesModel, condition, req.query);

  res.json(pages);
};
