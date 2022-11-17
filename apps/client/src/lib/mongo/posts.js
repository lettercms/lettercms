import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {Users} from '@lettercms/models/users';
import {findOne as findPost} from '@lettercms/utils/lib/findHelpers/posts';
import {find as findRecommendations} from '@lettercms/utils/lib/findHelpers/recommendations';

import jwt from 'jsonwebtoken';
import sdk from '@lettercms/sdk';

export async function getPosts(subdomain, url, userID) {
  await connect();

  const fields = 'subdomain,title,description,thumbnail,content,url,published,updated,tags,postStatus';

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


  return JSON.parse(JSON.stringify({
    posts,
    blog
  }));
}
