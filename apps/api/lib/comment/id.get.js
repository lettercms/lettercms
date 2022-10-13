import {isValidObjectId} from 'mongoose';
import comments from '@lettercms/models/comments';
import posts from '@lettercms/models/posts';
import '@lettercms/models/users';
import {find} from '@lettercms/utils/lib/findUtils';

export default async function() {
  const {
    req: {
      subdomain,
      query
    },
    res
  } = this;

  const conditions = {};

  const isId = isValidObjectId(query.id);

  if (isId)
    conditions.post = query.id;
  else {
    const {_id} = await posts.findOne({url: query.id, subdomain}, '_id');
    
    conditions.post = _id;
  }

  const existsPost = await posts.exists({_id: conditions.post});
  if (!existsPost)
    return res.status(404).json({
      status: 'not-found',
      message: 'Post not found'
    });

  const data = await find(comments, conditions, query);

  res.json(data);
};
