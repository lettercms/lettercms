import {Accounts} from '@lettercms/models/accounts';
import {find} from '@lettercms/utils/lib/findHelpers/accounts';

export default async function GetCollabs() {
  const {
    res,
    req: {
      subdomain,
      account,
      query
    }
  } = this;

  const conditions = {
    subdomain,
    _id: {
      $ne: account
    }
  };

  const data = await find(Accounts, conditions, query);

  res.json(data);
};
