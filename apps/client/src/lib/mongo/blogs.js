import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/models/blogs';
import posts from '@lettercms/models/posts';
import * as accounts from '@lettercms/models/accounts';
import {find as findPosts} from '@lettercms/utils/lib/findHelpers/posts';
//import {findOne as findBlog} from '@lettercms/utils/lib/findUtils';

export async function getBlog(subdomain, page = '1') {
  await connect();

  const blog = await blogs.findOne({subdomain}, 'title description thumbnail tags owner url mainUrl categories', {
    populate: {
      path: 'owner',
      select: 'photo name description lastname facebook twitter instagram linkedin website',
    }
  });

  const postsOptions = {
    fields: 'title,description,url,thumbnail,comments,author.name,author.lastname,author.photo,tags',
    page,
    sort: 'published'
  };

  const postsData = await findPosts(posts, {subdomain, postStatus: 'published'}, postsOptions);
  
  const popular = await findPosts(posts, {subdomain, postStatus: 'published'}, {
    mainUrl: blog.mainUrl,
    urlID: blog.url,
    fields: 'subdomain,title,thumbnail,fullUrl,url',
    limit: 3,
    sort: 'views'
  });

  return JSON.parse(JSON.stringify({
    posts: postsData.data,
    pagination: postsData.paging,
    blog,
    paging: postsData.paging,
    popular: popular.data
  }));
}

export async function getPathType(subdomain, paths = []) {
  await connect();
  const blog = await blogs.findOne({subdomain}, 'mainUrl url', {lean: true});

  if (!blog)
    return 'no-blog';

  const {mainUrl, url: urlID} = blog;
  if (paths?.length === 0) {
    if (!mainUrl)
      return 'main';
    if (mainUrl !== '/')
      return 'not-found';
  }

  const pathsJoined = '/' + paths.join('/');

  if (pathsJoined === mainUrl)
    return 'main';

  const url = pathsJoined.replace(mainUrl + '/', '').split('/');

  const post = await posts.findOne({subdomain, url: url[url.length - 1], postStatus: 'published'}, 'url published category', {lean: true});

  if (!post)
    return 'not-found';

  if (url.length == 1 && urlID === '1')
      return url[0] === post.url ? 'post' : 'not-found';

  if (url.length == 2 && urlID === '2')
      return url[0] === post.category &&
        post.url === url[1]
          ? 'post'
          : 'not-found';

  const year = post.published.getFullYear();
  const month = post.published.getMonth() + 1;

  if (url.length == 3 && urlID === '3') {
      return url[0] == year &&
        month == url[1] &&
        post.url === url[2]
          ? 'post'
          : 'not-found';
  }

  const day = post.published.getDate();
  if (url.length == 4 && urlID === '4') {
      return url[0] == year &&
        month == url[1] &&
        day == url[2] &&
        post.url === url[3]
          ? 'post'
          : 'not-found';
  }

  return 'not-found';
}