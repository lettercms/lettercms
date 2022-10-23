import connect from '@lettercms/utils/lib/connection';
import {Accounts, Codes} from '@lettercms/models/accounts';
import {withSentry} from '@sentry/nextjs';

async function verify(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      status: 'method-not-allowed'
    });

  const {email, code} = req.body;

  try {
    await connect();
    
    await Codes.deleteMany({expiresAt: {$lt: Date.now()}});

    const code = await Codes.findOne({email, code}, null, {lean: true});

    if (!code)
      return res.json({
        status: 'invalid-code',
        message: 'You must set a valid code'
      });

    const existsAccount = await Accounts.exists({
      email
    });

    if (existsAccount)
      return res.json({
        status: 'aready-exists',
        message: `Account with email "${email}" already exists`
      });

    const {name, lastname, password} = code;

    await Accounts.createAccount({
      photo: `https://avatar.tobi.sh/${emailHash}.svg?text=${decoded.name[0]+decoded.lastname[0]}&size=250`,
      name,
      lastname,
      password,
      email
    });

    res.json({
      status: 'OK'
    });
  } catch(err) {
    res.status(500).json({
      status: 'verification-error',
      message: 'Unable to verify account'
    });

    throw err;
  }
};

export default withSentry(verify);