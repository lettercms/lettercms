import {Accounts} from '@lettercms/models/accounts';
import {find} from '@lettercms/utils/lib/findHelpers/accounts';

export default async function() {
  const {
    req: {query, subdomain},
    res
  } = this;


  const {
    role
  } = query;

  const conditions = {};

  if (role)
    conditions.role = role;
  if (subdomain)
    conditions.subdomain = subdomain;

  const data = await find(Accounts, conditions, query);

  res.json(data);
};
