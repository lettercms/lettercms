import connect from '@lettercms/utils/lib/connection';
import {Accounts, Codes} from '@lettercms/models/accounts';
import {withSentry} from '@sentry/nextjs';
import bcrypt from 'bcrypt';

async function verify(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      status: 'method-not-allowed'
    });

  const {email, name, lastname} = req.body;

  await connect();
    
  await Codes.deleteMany({expiresAt: {$lt: Date.now()}});

  const code = await Codes.exists({email, code: req.body.code});

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


  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  await Accounts.createAccount({
    photo: `https://avatar.tobi.sh/${Buffer.from(email).toString('hex')}.svg?text=${name[0]+lastname[0]}&size=250`,
    name,
    lastname,
    password,
    email,
    role: 'admin'
  });
  
  await Codes.deleteOne({email, code: req.body.code});

  res.json({
    status: 'OK'
  });
};

export default withSentry(verify);