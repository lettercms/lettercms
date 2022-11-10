import {Accounts} from '@lettercms/models/accounts';

export default async function Test(req, res)  {
  const r = await Accounts.deleteMany({role: 'collaborator'});

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(r), null, 2);
}