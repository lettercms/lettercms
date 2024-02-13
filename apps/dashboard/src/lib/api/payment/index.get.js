import {Payment} from '@lettercms/models/payments';

export default async function GetPayment() {
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
