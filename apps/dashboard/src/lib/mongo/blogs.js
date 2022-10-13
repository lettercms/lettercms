import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/models/blogs';
import posts from '@lettercms/models/posts';
import {Ratings} from '@lettercms/models/users';
import jwt from 'jsonwebtoken';

const subdomain = 'davidsdevel';

export async function getBlog(page) {
  await connect();

  const blogData = await blogs.findOne({subdomain}, 'categories description title url', {lean: true});

  if (!blogData)
    return Promise.resolve({
      notFound: true
    });

  delete blogData._id;

  const postsData = await posts.find({subdomain, postStatus: 'published'}, 'description title images url thumbnail comments category', {lean: true, limit: 10, 
    sort: {
      published: -1
    }});

  return Promise.resolve({
    posts: postsData.map(({_id, ...e}) => ({...e, _id: _id.toString()})),
    blog: blogData
  });
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
