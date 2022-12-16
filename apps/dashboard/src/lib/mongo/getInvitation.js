import connect from '@lettercms/utils/lib/connection';
import '@lettercms/models/blogs';
import {Invitations} from '@lettercms/models/accounts';

export default async function getInivitation(_id, subdomain) {
  await connect();

  await Invitations.deleteMany({expiresAt: {$lt: Date.now()}});

  const fields = 'subdomain type blog blogOwner email expiresAt';

  const invitation = await Invitations.findOne({_id}, fields, {populate: [{path: 'blog', select: 'title'}, {path: 'blogOwner', select: 'name lastname'}]});

  if (!invitation)
    return {
      notFound: true
    };
  
  return JSON.parse(JSON.stringify(invitation));
}
