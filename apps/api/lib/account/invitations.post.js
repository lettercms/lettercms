import blogs from '@lettercms/models/blogs';
import {Accounts, Invitations} from '@lettercms/models/accounts';
import sendMail from '@lettercms/utils/lib/sendMail';
import jwt from 'jsonwebtoken';

export default async function() {
  const {
    req: {subdomain, body, account},
    res
  } = this;

  await Invitations.deleteMany({expiresAt: {$lt: Date.now()}});

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
  const {name, lastname}  = Accounts.findOne({_id: account}, 'name lastname', {lean: true});

  const {_id} = await Invitations.create({
    ...body,
    subdomain,
    type: 'collaborator',
    blog: blog._id,
    blogOwner: account,
    expiresAt: Date.now() + (60 * 60 * 24 * 1000)
  });

  const r = await sendMail(body.email, `Has sido invitado a colaborar en ${blog.title} - LetterCMS`, {
    type: 'invitation',
    name: body.name,
    lastname: body.lastname,
    admin: `${name} ${lastname}`,
    invitation: _id
  });

  console.log(r);

  res.json({
    status: 'OK'
  });
};
