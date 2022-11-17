import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/models/blogs';
import posts from '@lettercms/models/posts';
import * as accounts from '@lettercms/models/accounts';
import {find as findPosts} from '@lettercms/utils/lib/findHelpers/posts';
//import {findOne as findBlog} from '@lettercms/utils/lib/findUtils';

export async function getBlog(subdomain, page = '1') {
  await connect();

  const blog = await blogs.findOne({subdomain}, 'title description thumbnail owner url mainUrl', {
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

  return JSON.parse(JSON.stringify({
    posts: postsData.data,
    blog,
    paging: postsData.paging
  }));
}
