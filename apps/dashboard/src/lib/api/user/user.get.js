import {Users} from '@lettercms/models/users';
import {findOne} from '@lettercms/utils/lib/findUtils';

export default async function GetUser() {
  const {req, res} = this;

  const {id} = req.query;

  const data = await findOne(Users, {_id: id}, req.query);

  if (data === null)
    res.sendStatus(404);
  else
    res.json(data);
};