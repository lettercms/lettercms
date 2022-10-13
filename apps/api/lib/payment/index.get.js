import {Payment} from '@lettercms/models/payments';

export default async function() {
  const {
    req: {
      subdomain,
      query
    },
    res,
    findSingle
  } = this;

  const data = await findSingle(query, Payment, {
    subdomain
  });

  res.json(data);
};
