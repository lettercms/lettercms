import connect from '@lettercms/utils/lib/connection';
import {Accounts, Codes} from '@lettercms/models/accounts';
import sendMail from '@lettercms/utils/lib/sendMail';
import {withSentry} from '@sentry/nextjs';

async function create(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      status: 'method-not-allowed'
    });

  await connect();

  const {
    email,
    isSubscribeToNewsletter,
    name
  } = req.body;

  const existsAccount = await Accounts.exists({
    email
  });

  if (existsAccount)
    return res.json({
      status: 'email-exists',
      message: 'Email already exists'
    });


  if (isSubscribeToNewsletter) {
    try {
      await Accounts.create({
        email,
        isSubscribeToNewsletter
      });

      return res.json({
        status: 'OK'
      });

    } catch(err) {
      return res.status(500).json({
        status: 'subscription-error',
        message: 'Error on supscription'
      });
    }
  }

  //delete expired codes
  await Codes.deleteMany({expiresAt: {$lt: Date.now()}});

  //Generate 4 digit verification code
  let code = '';

  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }

  await Codes.create({
    code,
    email
  });

  try {
    await sendMail(email, `${name} verifica tu cuenta - LetterCMS`, {
      type: 'verify',
      code,
      name
    });
  } catch(err) {
    return res.status(500).json({
      status: 'email-error',
      message: 'Error Sending Email'
    });
  }
  
  res.json({
    status: 'OK'
  });
};

export default withSentry(create);
