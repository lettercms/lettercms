import posts from '@lettercms/models/posts';
import {Ratings, Users} from '@lettercms/models/users';
import train from '@/lib/recommendation/lib/training';
import jwt from 'jsonwebtoken';

const parseTags = arr => {
  const tags = {};

  arr.forEach(e => tags[e] = 1);

  return tags;
};

export default async function TrainigRecommendation() {
  const {
    res,
    req: {
      query: {
        id
      },
      body: {
        url
      },
      subdomain
    }
  } = this;

  const existsUrl = await posts.exists({subdomain, url});

  if (!existsUrl)
    return res.json({
      status: 'not-found'
    });


  const {tags, _id} = await posts.findOne({subdomain, url}, 'tags');

  const views = parseTags(tags);
  const {postsView} = await Users.findOne({_id: id}, 'postsView', {lean: true});

  if (postsView < 5)
    await Users.updateOne({_id: id}, {views: [
      views,
      views,
      views,
      views,
      views,
    ], postsView: 5});
  else
    await Users.updateOne({_id: id}, {$push: {views}, $inc: {postsView: 1}});

  await Ratings.updateOne({post: _id}, {viewed: true});

  const token = jwt.sign({subdomain}, process.env.JWT_AUTH);

  train(id, subdomain);

  res.json({
    status: 'OK'
  });
};
