import {Users} from '@lettercms/models/users';

export default async function() {
  const {req, res} = this;

  const {id} = req.query;

  if (req.body.email)
    req.bosy.subscriptionTime = new Date();

  await Users.updateOne({_id: id}, req.body);

  res.json({
    status: 'OK'
  });
};
