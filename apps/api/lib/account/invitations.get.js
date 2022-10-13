import {Invitations} from '@lettercms/models/accounts';
import {find} from '@lettercms/utils/lib/findUtils';

export default async function() {
  const {
    req: {
      subdomain,
      query
    },
    res
  } = this;

  const data = await find(Invitations, {subdomain}, query);

  res.json(data);
};
