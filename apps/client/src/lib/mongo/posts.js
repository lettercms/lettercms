import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {findOne as findPost, find as findAll} from '@lettercms/utils/lib/findHelpers/posts';
import {findSimilars} from '@lettercms/utils/lib/findHelpers/recommendations';

export async function getPost(subdomain, url, userID) {
  await connect();

  const fields = 'subdomain,title,description,thumbnail,content,url,published,updated,tags,postStatus,author.*';

  const {url: urlID, mainUrl, tags, categories, title} = await blogs.findOne({subdomain}, 'title mainUrl url tags categories', {lean: true});

  const post = await findPost(posts, {url, subdomain}, {
    fields,
    urlID,
    mainUrl
  });

  const popular = await findAll(posts, {subdomain, postStatus: 'published', url: {$ne: url}}, {
    mainUrl,
    urlID,
    fields: 'subdomain,title,thumbnail,fullUrl,url',
    limit: 3,
    sort: 'views'
  });

  const recommended = await findSimilars(posts, {
    post: {
      subdomain,
      url
    },
    mainUrl,
    urlID,
    fields: 'title,description,url,thumbnail,comments,author.name,author.lastname,author.photo,author.facebook,author.twitter,author.instagram,author.linkedin,tags',
    limit: 2
  });

  if (post?.postStatus !== 'published')
    return {
      notFound: true
    };

  return JSON.parse(JSON.stringify({
    post,
    popular: popular.data,
    recommended,
    blog: {
      title,
      tags,
      categories
    }
  }));
}
