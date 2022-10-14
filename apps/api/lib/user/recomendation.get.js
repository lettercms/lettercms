import postModel from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {Ratings, Users} from '@lettercms/models/users';
import {find as findRecommendations} from '@lettercms/utils/lib/findHelpers/recommendations';
import {find as findPosts} from '@lettercms/utils/lib/findHelpers/posts';
import {isValidObjectId} from 'mongoose';

export default async function() {
  const {
    req,
    res,
    find
  } = this;

  const {subdomain, path} = req;
  const {id} = req.query;
  
  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'url mainUrl');

  const haveModel = isValidObjectId(id) ? await Users.exists({_id: id, hasRecommendations: true}) : false;

  let posts = null;

  if (haveModel) {
    posts = await findRecommendations(Ratings, {userID: id}, {
      ...req.query,
      mainUrl,
      urlID
    });
  } else {
    const condition = {
      subdomain,
      postStatus: 'published'
    };

    posts = await findPosts(postModel, condition, {
      ...req.query,
      mainUrl,
      urlID
    });
  }

  res.json(posts);
};