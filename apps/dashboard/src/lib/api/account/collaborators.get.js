import {Accounts} from '@lettercms/models/accounts';
import {find} from '@lettercms/utils/lib/findHelpers/accounts';

export default async function GetCollabs() {
  const {
    res,
    req
  } = this;

  const {subdomain, account, path} = req;

  const conditions = {
    subdomain,
    _id: {
      $ne: account
    }
  };

  const data = await find(Accounts, conditions, req.query);

  res.json(data);
};
