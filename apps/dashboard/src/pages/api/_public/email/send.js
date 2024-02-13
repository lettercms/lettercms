import {Codes} from '@lettercms/models/accounts';
import manageMethods from '@lettercms/utils/lib/manageMethods';
import sendMail from '@lettercms/utils/lib/sendMail';

async function POST() {
  const {req, res} = this;
  const {isAdmin} = req;

  const {data} = req.body;

  if (isAdmin) {
    const {template, name, email} = data;

    if (template === 'verify') {
       //delete expired codes
      await Codes.deleteMany({email});

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
    }
  }

  res.json({
    status:'OK'
  });
};

export default manageMethods({
  POST
});
