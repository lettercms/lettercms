import posts from '@lettercms/models/posts';
import {Users, Ratings} from '@lettercms/models/users';
import rate from './rate';
import generateData from './generateData';
import blogs from '@lettercms/models/blogs';

const training = async (userID, subdomain) => {
  const {views} = await Users.findOne({_id: userID}, 'views', {lean: true});

  const rates = generateData(views);

  await Users.updateOne({_id: userID}, {
    hasRecommendations: true,
    mlModel: JSON.stringify(rates)
  });

  const p = await posts.find({subdomain, postStatus:'published'}, 'tags');

  const promises = p.filter(e => e.tags.length > 0).map(async ({_id: post, tags}) => {

    const wanted = rate(rates, tags);

    return Ratings.updateOne({userID, post}, {rating: wanted});
  });

  return promises;
};

export default training;
