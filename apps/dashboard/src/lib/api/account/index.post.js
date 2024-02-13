import {Accounts} from '@lettercms/models/accounts';
import sendMail from '@lettercms/utils/lib/sendMail';
import {sign} from '@lettercms/utils/lib/crypto';

export default async function PostAcounts() {
  const {req,res} = this;
  const {
    isAdmin
  } = req;

  if (!isAdmin)
    return res.sendStatus(401);

  const {
    email,
    isSubscribeToNewsletter
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
        message: 'Error al subscribir'
      });
    }
  }

  req.body.role = 'admin';

  const key = await sign(process.env.JWT_AUTH); //jwt.sign(req.body, process.env.JWT_AUTH, { expiresIn: 60 * 5 });
  const hex = Buffer.from(JSON.stringify(req.body)).toString('hex');

  try {
    await sendMail(req.body.email, `${req.body.name} verifica tu cuenta - LetterCMS`, {
      type: 'verify',
      ...req.body
    });
  } catch(err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error Sending Email'
    });
  }
  
  res.json({
    status: 'OK',
    token: `${key}@${hex}`
  });
};
