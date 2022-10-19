import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/models/blogs';
import posts from '@lettercms/models/posts';
import {Ratings} from '@lettercms/models/users';
import jwt from 'jsonwebtoken';
import {find as findPosts} from '@lettercms/utils/lib/findHelpers/posts';
import {findOne as findBlog} from '@lettercms/utils/lib/findUtils';
import {find as findRecommendations} from '@lettercms/utils/lib/findHelpers/recommendations';

const subdomain = 'davidsdevel';

export async function getBlog(page = '1', userID) {
  await connect();

  const blog = await blogs.findOne({subdomain}, 'thumbnail owner urlID mainUrl', {
    populate: {
      path: 'owner',
      select: 'photo name description lastname facebook twitter instagram linkedin website',
    }
  });

  const postsOptions = {
    fields: 'title,description,url,fullUrl,thumbnail,comments',
    page,
    urlID: blog.urlID,
    mainUrl: blog.mainUrl,
    sort: 'published'
  };

  let postsData = null;

  if (!userID || userID === 'undefined')
    postsData = await findPosts(posts, {subdomain, postStatus: 'published'}, postsOptions);
  else
    postsData = await findRecommendations(Ratings, {subdomain, userID}, postsOptions);

  return {
    posts: postsData,
    blog,
    paging: postsData.paging
  };
}

export async function getRecommended(userID, page) {
  await connect();

  const blog = await blogs.findOne({subdomain}, 'categories description title url', {lean: true});

  if (!blog)
    return Promise.resolve({
      notFound: true
    });

  const postsData = await Ratings.find({userID}, 'post', {
    lean: true,
    populate: {
      path: 'post',
      select: 'description title images url thumbnail comments category'
    },
    sort: {
      viewed: 1,
      rating: -1
    }
  });

  if (postsData.lenght === 0)
    return Promise.resolve({
      notFound: true
    });

  return Promise.resolve({
    posts: postsData.map(({post}) => post),
    blog
  });
}

