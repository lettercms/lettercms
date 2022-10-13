import blogs from '@lettercms/models/blogs';
import {Accounts, Invitations} from '@lettercms/models/accounts';
import sendMail from '@lettercms/utils/lib/sendMail';
import jwt from 'jsonwebtoken';

export default async function() {
  const {
    req: {subdomain, body, account},
    res
  } = this;

  const existsAccount = await Accounts.exists({
    email: body.email
  });

  if (existsAccount)
    return res.json({
      status: 'account-exists',
      message: 'Accounts already exists'
    });

  const existsInvitation = await Invitations.exists({
    email: body.email
  });

  if (existsInvitation)
    return res.json({
      status: 'invitation-sent',
      message: `Invitation to "${body.email}" already sent`
    });

  const blog = await blogs.findOne({subdomain}, 'title', {lean: true});
  const token = jwt.sign({subdomain}, process.env.JWT_AUTH);

  const {_id} = await Invitations.create({
    ...body,
    subdomain,
    blog: blog._id,
    blogOwner: account
  });

  await sendMail(body.email, `Has sido invitado a colaborar en ${blog.title} - LetterCMS`, {
    type: 'invitation',
    title: blog.title,
    url: `https://lettercms.vercel.app/invitation/${_id}`
  });

  res.json({
    status: 'OK'
  });
};
