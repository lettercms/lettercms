import {Invitations} from '@lettercms/models/accounts';
import {findOne} from '@lettercms/utils/lib/findUtils';

export default async function GetSingleInvitation() {
  const {
    req:{query},
    res
  } = this;

  const {id} = query;

  const data = await findOne(Invitations, {_id: id}, query);

  if (data === null)
    return res.status(404).json({message: 'Invitation not found'});

  return res.json(data);
};