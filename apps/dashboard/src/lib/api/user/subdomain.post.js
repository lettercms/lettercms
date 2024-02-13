import posts from '@lettercms/models/posts';
import {Ratings, Users} from '@lettercms/models/users';

export default async function CreateUser() {
  const {req: {subdomain, body}, res} = this;

  const {_id: id} = await Users.create({...body, subdomain});

  const data = await posts.find({subdomain, postStatus: 'published'}, '_id');

  const promises = data.map(({_id}) =>
    Ratings.create({
      userID: id,
      post: _id,
      subdomain
    })
  );

  Promise.allSettled(promises);

  res.json({
    status: 'OK',
    id
  });
};
