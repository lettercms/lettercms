import posts from '@lettercms/models/posts';
import {Users, Ratings} from '@lettercms/models/users';
import brain from '@/lib/brain';
import parseTags from './parseTags';
import generateData from './generateData';

const netOptions = {
  activation: 'sigmoid',
  hiddenLayers: [4]
};

const trainingOptions = {
  iterations: 20000,
  errorThresh: 0.001
};

const training = async (userID, subdomain) => {
  
  const {views} = await Users.findOne({_id: userID}, 'views', {lean: true});

  const data = generateData(views);

  const crossValidate = new brain.CrossValidate(brain.NeuralNetworkGPU, netOptions);

  crossValidate.train(data, trainingOptions);

  await Users.updateOne({_id: userID}, {
    hasRecommendations: true,
    mlModel: JSON.stringify(crossValidate.toJSON())
  });

  const net = crossValidate.toNeuralNetwork();

  const p = await posts.find({subdomain, postStatus:'published'}, 'tags');

  const promises = p.filter(e => e.tags.length > 0).map(({_id: post, tags}) => {
    const parsed = parseTags(tags);
    const {wanted} = net.run(parsed);

    return Ratings.updateOne({userID, post}, {rating: wanted});
  });

  return Promise.allSettled(promises);
};

export default training;
