import {Users} from '@lettercms/models/users';
import {find} from '@lettercms/utils/lib/findUtils';

export default async function() {
  const {req: {query, subdomain}, res} = this;

  const condition = {
    subdomain
  };

  const users = await find(Users, condition, query);

  res.json(users);
};