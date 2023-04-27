import connect from '@lettercms/utils/lib/connection';
import * as accounts from '@lettercms/models/accounts';
import usage from '@lettercms/models/usages';
import bcrypt from 'bcrypt';

export default async function createCollab(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      status: 'method-not-allowed'
    });

  await connect();

  const {body} = req;

  const invitation = await accounts.Invitations.findOne({
    email: body.email
  });

  if (!invitation)
    return res.json({
      status: 'not-invited',
      messages: 'Collaborator not invited'
    });


  const password = await bcrypt.hash(body.password, 10);

  await accounts.Accounts.create({
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    photo: `https://avatar.tobi.sh/${Buffer.from(body.email).toString('hex')}.svg`,
    password,
    role: 'collaborator',
    subdomain: invitation.subdomain
  });

  /*await accounts.Invitations.updateOne({
    subdomain,
    email: body.email
  }, {
    status: 'accepted'
  });*/

  await accounts.Invitations.deleteOne({subdomain: invitation.subdomain, email: body.email});

  await usage.updateOne({subdomain: invitation.subdomain}, {$inc: {accountsCollabs: 1}});

  res.json({
    status: 'OK'
  });
};
