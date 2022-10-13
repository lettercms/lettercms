import {Accounts} from '@lettercms/models/accounts';
import {findOne} from '@lettercms/utils/lib/findHelpers/accounts';

export default async function() {
  const {
    req,
    res
  } = this;

  const {account, query} = req;

  const data = await findOne(Accounts, {_id: account}, query);

  if (data === null){
    res.status(404);
    return res.end();
  }

  res.json(data);
};
