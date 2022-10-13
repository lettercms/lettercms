import {Users, Ratings} from '@lettercms/models/users';
import comments from '@lettercms/models/comments';

export default async function() {
  const {
    req: {
      body: {
        from,
        to
      }
    },
    res
  } = this;

  const user1 = await Users.findOne({
    _id: from
  });

  if (!user1)
    return res.json({
      status: 'no-user',
      message: 'Merging user not found'
    });

  let user2 = await Users.findOne({
    _id: to
  });

  if (!user2)
    return res.json({
      status: 'no-user',
      message: 'Merged user not found'
    });

  user2.views = user2.views.concat(user1.views);
  user2.postsView = user2.postsView + user1.postsView;
  user2.mlModel = '';
  user2.hasRecommendation = false;


  await Users.updateOne({
    _id: to
  }, user2);

  //TODO do training
  await comments.updateMany({post: from}, {post: to});
  await Ratings.deleteMany({userID: from});

  await Users.deleteOne({
    _id: from
  });


  res.json({
    status: 'OK'
  });
};