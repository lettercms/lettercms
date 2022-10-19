import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import {Users} from '@lettercms/models/users';
import jwt from 'jsonwebtoken';
import {findOne as findPost} from '@lettercms/utils/lib/findHelpers/posts';
import {find as findRecommendations} from '@lettercms/utils/lib/findHelpers/recommendations';
import sdk from '@lettercms/sdk';

const subdomain = 'davidsdevel';

export async function getPost(url, userID) {
  await connect();

  const fields = 'title,description,thumbnail,content,url,published,updated,tags';

  const {url: urlID, mainUrl} = await blogs.findOne({subdomain}, 'mainUrl url', {lean: true});

  const post = await findPost(posts, {url, subdomain}, {
    fields,
    urlID,
    mainUrl
  });

  if (post?.postStatus !== 'published')
    return {
      notFound: true
    };
    
  if (userID)
    const user = userID
      ? await Users.findOne({_id: userID}, 'name lastname email', {lean: true})
      : {}

  const token = jwt.sign({subdomain}, process.env.JWT_AUTH);

  const _sdk = new sdk.Letter(token);
 
  const recommendation = await _sdk.users.recommendationForPost(userID, url, fields.split(','));

  return {
    post,
    user,
    recommendation
  }
}

