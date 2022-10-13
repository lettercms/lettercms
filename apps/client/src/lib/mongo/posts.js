import connect from '@lettercms/utils/lib/connection';
import jwt from 'jsonwebtoken';
import '@lettercms/models/accounts';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';

export async function getPreviewPost(id, subdomain) {
  try {
    await connect();

    const blogData = await blogs.findOne({subdomain}, 'title', {lean: true});

    const postsData = await posts.findById(id,
    'images url content title tags postStatus updated category description published authorEmail thumbnail',
    {
      lean: true,
      populate: {
        path: 'author',
        select: 'name lastname description photo facebook twitter instagram linkedin website'
      }
    });

    const similars = await posts.find({_id: {$ne: id}, subdomain, postStatus: 'published'}, 'title description thumbnail views comments', {lean: true, sort: {published: -1}, limit: 2});

    return {
      blog: blogData,
      post: postsData,
      recommended: similars[0],
      similar: similars[1]
    };
  } catch (err) {
    throw err;
  }

}
export async function getUrls() {
  await connect();

  const postData = await posts.find({postStatus: 'published', subdomain: 'davidsdevel'}, 'url subdomain', {lean: true, limit: 100});

  return Promise.resolve(postData.map(e => {
    return {
      params: {
        subdomain: e.subdomain,
        post: e.url
      }
    };
  }));
}

export async function getPost(subdomain, paths, userID) {
  await connect();

  const url = paths[paths.length - 1];

  const blogData = await blogs.findOne({subdomain}, 'title url mainUrl', {lean: true});

  if (!blogData)
    return Promise.resolve({
      blog: {
        notFound: true
      }
    });

  const isValidUrl = await validyUrl(subdomain, paths);
  
  if (!isValidUrl)
    return Promise.resolve({
      blog: {
        notFound: false
      },
      post: {
        notFound: true
      }
    });

  const postData = await posts.findOne({
    subdomain,
    url
  },
  'images subdomain url content title tags postStatus updated category description published author thumbnail',
  {
    lean: true,
    populate: {
      path: 'author',
      select: 'name lastname description photo facebook twitter instagram linkedin website'
    }
  });

  const hasTags = postData.tags && postData.tags?.length > 0;

  const similars = await getSimilars(posts, {
    subdomain,
    tags: hasTags && postData.tags,
    actual: postData._id
  });

  const similar = similars[0];
  const recommended = similars[1];

  postData.fullUrl = generateFullUrl({
    ...postData,
    urlID: blogData.url,
    basePath: blogData.mainUrl
  });
  recommended.fullUrl = generateFullUrl({
    ...recommended,
    urlID: blogData.url,
    basePath: blogData.mainUrl
  });
  similar.fullUrl = generateFullUrl({
    ...similar,
    urlID: blogData.url,
    basePath: blogData.mainUrl
  });


  if (recommended)
    recommended._id = recommended._id.toString();
  if (similar)
    similar._id = similar._id.toString();

  postData._id = postData._id.toString();
  postData.updated = postData.updated.toISOString();
  postData.published = postData.published.toISOString();
  postData.author._id = postData.author._id.toString();

  delete blogData._id;

  return Promise.resolve({
    post: postData,
    blog: blogData,
    similar,
    recommended,
    accessToken: jwt.sign({subdomain}, process.env.JWT_AUTH)
  });
}

async function getSimilars(model, {
  subdomain,
  tags,
  actual
}) {

  let similars = [];

  if (tags) {
    const tagsMapped = tags.map(e => ({tags: {$in: e}}));
    const similarsTags = await model.find({
      subdomain,
      $nor:[{_id: actual}],
      $or: tagsMapped,
      postStatus: 'published'
    },
    'title description thumbnail views comments tags url',
    {
      lean: true
    });

    similars = similarsTags.map(e => {
      let matches = 0;
      e.tags.forEach(t => {
        if (tags.includes(t))
          matches++;
      });
      return {
        matches,
        _id: e._id
      };
    }).sort((a,b) => a.matches > b.matches ? -1 : +1).slice(0, 2);
  }
  
  if (similars.length === 0)
    similars = await model.find({_id: {$ne: actual}, subdomain, postStatus: 'published'}, 'title description thumbnail views comments url', {lean: true, sort: {published: -1}, limit: 2});
  else if (similars.length === 1)
    similars[1] = await model.findOne({_id: {$ne: actual}, subdomain, postStatus: 'published'}, 'title description thumbnail views comments url', {lean: true, sort: {published: -1}});   

  return Promise.resolve(similars);
}

async function validyUrl(subdomain, paths) {
  await connect();

  const url = paths[paths.length - 1];
  
  const post = await posts.findOne({subdomain, url}, 'published category postStatus', {lean: true});
  
  if (post?.postStatus !== 'published')
    return Promise.resolve(false);

  const blog = await blogs.findOne({subdomain}, 'mainUrl url', {lean: true});

  const fullUrl = generateFullUrl({
    url,
    published: post.published,
    urlID: blog.url,
    basePath: blog.mainUrl,
    category: post.category
  });

  const fullPath =`/${paths.join('/')}`;

  if (fullPath === fullUrl)
    return Promise.resolve(true);

  return Promise.resolve(false);
}

export function generateFullUrl({url, urlID, published, basePath, category}) {
  if (urlID == '1')
    return `${basePath}/${url}`;

  if (urlID == '2')
    return `${basePath}/${data.category}/${url}`;

  const year = published.getFullYear();
  const month = published.getMonth() + 1;

  if (urlID == '3')
    return `${basePath}/${year}/${month}/${url}`;

  const date = published.getDate();

  return `${basePath}/${year}/${month}/${date}/${url}`;
};