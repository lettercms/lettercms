import comments from '@lettercms/models/comments';
import posts from '@lettercms/models/posts';
import {Users} from '@lettercms/models/users';
import {Stats} from '@lettercms/models/stats';

export default async function GetAllComments() {
  const {
    req: {
      subdomain,
      body: {
        userID,
        postID,
        comment
      }
    },
    res
  } = this;

  const existsPost = await posts.exists({_id: postID});
  if (!existsPost)
    return res.status(400).json({
      status: 'not-found',
      message: 'Post not found'
    });

  const existsUser = await Users.exists({_id: userID});
  if (!existsUser)
    return res.status(400).json({
      status: 'not-found',
      message: 'User not found'
    });

  const {_id} = await comments.create({
    subdomain,
    post: postID,
    user: userID,
    comment
  });
  await posts.updateOne({_id: postID}, {$inc: {comments: 1}});
  await Stats.updateOne({subdomain}, {$inc: {totalComments: 1}});

  res.json({
    status: 'OK',
    id: _id
  });
};