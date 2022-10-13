import comments from '@lettercms/models/comments';
import {Ratings, Users} from '@lettercms/models/users';

export default async function() {
  const {req: {
    subdomain,
    query: {
      id
    }
  }, res} = this;

  await Users.deleteOne({_id: id, subdomain});
  await Ratings.deleteMany({userID: id});
  await comments.deleteMany({user: id});

  res.json({
    status: 'OK'
  });
};
