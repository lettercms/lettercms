import connect from '@lettercms/utils/lib/connection';
import {Accounts} from '@lettercms/models/accounts';
import {compare} from '@lettercms/utils/lib/crypto';

export default async function(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      status: 'method-not-allowed'
    });
  
  await connect();

  const {token} = req.body;

  if (!token)
    return res.status(400).json({
      status: 'bad-request',
      message: 'You must set a valid code'
    });

  const [key, dataHex] = token.split('@');

  const isValid = await compare(process.env.JWT_AUTH, key);

  if (!isValid)
    return res.json({
      status: 'invalid-token'
    });

  const decoded = JSON.parse(Buffer.from(dataHex, 'hex').toString('utf-8'));
  const {email} = decoded;

  try {
    const existsAccount = await Accounts.exists({
      email
    });

    if (existsAccount)
      return res.json({
        status: 'aready-exists',
        message: `Account with email "${email}" already exists`
      });

    const emailHash = Buffer.from(email).toString('hex');

    await Accounts.createAccount({
      photo: `https://avatar.tobi.sh/${emailHash}.svg?text=${decoded.name[0]+decoded.lastname[0]}&size=250`,
      ...decoded
    });

    res.json({
      status: 'OK'
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({
      status: 'verification-error',
      message: 'Unable to verify account'
    });
  }
};
