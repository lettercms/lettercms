import {isValidObjectId} from 'mongoose';
import {Accounts} from '@lettercms/models/accounts';
import {findOne} from '@lettercms/utils/lib/findHelpers/accounts';

export default async function() {
  const {
    req,
    res
  } = this;

  const {
    emailHex
  } = req.query;

  let condition = {};

  const isId = isValidObjectId(emailHex);

  if (isId)
    condition._id = emailHex;
  else
    condition.email = Buffer.from(emailHex, 'hex').toString('utf-8');

  let data = await findOne(Accounts, condition, req.query);

  if (data === null && isId)
    data = await findOne(Accounts, {
      email: Buffer.from(emailHex, 'hex').toString('utf-8')
    }, req.query);

  if (data === null)
    return res.status(404).json({
      status: 'not-found',
      message:'Account does not exists'
    });

  res.json(data);
};
