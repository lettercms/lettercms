import {withSentry} from '@sentry/nextjs';
import connect from '@lettercms/utils/lib/connection';
import {Accounts} from '@lettercms/models/accounts';

async function login(req, res) {
  if (req.method !== 'POST')
    return res.status(405);

  //TODO: add functionon API 
  res.json({});
}

export default withSentry(login);
