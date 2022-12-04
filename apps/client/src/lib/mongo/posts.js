import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {findOne as findPost, find as findAll} from '@lettercms/utils/lib/findHelpers/posts';

export async function getPost(subdomain, url, userID) {
  await connect();

  const fields = 'subdomain,title,description,thumbnail,content,url,published,updated,tags,postStatus,author.*';

  const {url: urlID, mainUrl, tags, categories} = await blogs.findOne({subdomain}, 'mainUrl url tags categories', {lean: true});

  const post = await findPost(posts, {url, subdomain}, {
    fields,
    urlID,
    mainUrl
  });

  const popular = await findAll(posts, {subdomain}, {
    mainUrl,
    urlID,
    fields: 'subdomain,title,thumbnail,fullUrl',
    limit: 3,
    sort: 'views'
  });

  if (post?.postStatus !== 'published')
    return {
      notFound: true
    };

  return JSON.parse(JSON.stringify({
    post,
    popular: popular.data,
    blog: {
      tags,
      categories
    }
  }));
}
