import * as accounts from '@lettercms/models/accounts';
import usage from '@lettercms/models/usages';

export default async function() {
  const {
    req: {
      body,
      subdomain
    },
    res,
  } = this;

  const invitation = await accounts.Invitations.findOne({
    email: body.email
  });

  if (invitation === null)
    return res.json({
      status: 'not-invited',
      messages: 'Collaborator not invited'
    });

  if (invitation.expireIn < Date.now())
    return res.json({
      status: 'invitation-expired',
      message: `Invitation to ${body.email} expired`
    });

  await accounts.Accounts.createCollab(subdomain, body);
  await accounts.Invitations.updateOne({
    subdomain,
    email: body.email
  }, {
    status: 'accepted'
  });
  await usage.updateOne({subdomain}, {$inc: {accountsCollabs: 1}});

  res.json({
    status: 'OK'
  });
};
