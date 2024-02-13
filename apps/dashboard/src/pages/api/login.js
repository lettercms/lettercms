import connect from '@lettercms/utils/lib/connection';
import {Accounts} from '@lettercms/models/accounts';

const isDev = process.env.NODE_ENV !== 'production';

export default async function API(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      status: 'Method not allowed'
    });

  await connect();

  const {email, password} = req.body;

  const account = await Accounts.login(email, password);

  res.json(account);
}
