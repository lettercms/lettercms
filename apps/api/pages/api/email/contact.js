import manageMethods from '@lettercms/utils/lib/manageMethods';
import sendMail from '@lettercms/utils/lib/sendMail';
import blogs from '@lettercms/models/blogs';
import '@lettercms/models/accounts';

async function POST() {
  const {req, res} = this;
  const {subdomain} = req;


  const {owner, title} = await blogs.findOne({subdomain}, 'owner title', {populate: 'owner', select: 'email'})

  await sendMail(owner.email, `Contacto para ${title} - LetterCMS`, {
    type: 'contact',
    __title: title,
    ...req.body
  });

  res.json({
    status:'OK'
  });
};

export default manageMethods({
  POST
});
