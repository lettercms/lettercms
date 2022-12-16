import manageMethods from '@lettercms/utils/lib/manageMethods';
import sendMail from '@lettercms/utils/lib/sendMail';
import jwt from 'jsonwebtoken';

async function POST() {
  const {req, res} = this;
  const {isAdmin} = req;

  const {data} = req.body;

  if (isAdmin) {
    const {template, email, name} = data;
    let {role} = data;

    if (template === 'verify') {
      role = 'admin';

      const code = jwt.sign(data, process.env.JWT_AUTH, { expiresIn: 60 * 5 });

      await sendMail(email, `${name} verifica tu cuenta - LetterCMS`, {
        type: 'verify',
        url: `https://lettercms-api-staging.herokuapp.com/api/account/verify?token=${code}&e=${Buffer.from(data.email).toString('hex')}`,
        ...data
      });
    }
  }

  res.json({
    status:'OK'
  });
};

export default manageMethods({
  POST
});
