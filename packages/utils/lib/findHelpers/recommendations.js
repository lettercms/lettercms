import {find as baseFind, parseQuery} from '../findUtils';
import {getFullUrl} from '../posts';

export const find = async (model, filter, opts = {}) => {
  let hasUrl = false;
  let hasPublished = false;
  let hasCategory = false;
  let hasFullUrl = false;

  opts.fields = opts.fields?.split(',').map(e => ('post.' + e)).join(',') || 'post';

  if (opts.fields) {

    const splitted = opts.fields.split(',');

    hasFullUrl = splitted.includes('post.fullUrl');
    hasUrl = splitted.includes('post.url');
    hasCategory = splitted.includes('post.category');
    hasPublished = splitted.includes('post.published');

    if (hasFullUrl) {
      if (!hasUrl)
        splitted.push('post.url');
      if (!hasCategory)
        splitted.push('post.category');
      if (!hasPublished)
        splitted.push('post.published');
    }

    opts.fields = splitted.join(',');
  }

  opts.sort = {
    viewed: 1,
    rating: -1
  };

  const posts = await baseFind(model, filter, opts);

  posts.data = posts.data.map(({post}) => {
    if (post.postStatus !== 'published')
      return post;

    post.fullUrl = opts.mainUrl + getFullUrl(post, opts.urlID);

    if (!hasUrl)
      delete post.url;
    if (!hasCategory)
      delete post.category;
    if (!hasPublished)
      delete post.published;

    return post;
  });

  return posts;
};

export const findOne = async (model, filter, query) => {
  let hasUrl = false;
  let hasPublished = false;
  let hasCategory = false;
  let hasFullUrl = false;

  if (query.fields) {
    const splitted = query.fields.split(',');

    hasFullUrl = splitted.includes('fullUrl');
    hasUrl = splitted.includes('url');
    hasCategory = splitted.includes('category');
    hasPublished = splitted.includes('published');

    if (hasFullUrl) {
      if (!hasUrl)
        splitted.push('url');
      if (!hasCategory)
        splitted.push('category');
      if (!hasPublished)
        splitted.push('published');
    }

    query.fields = splitted.join(',');
  }

  const {options, projection} = parseQuery(query);

  const data = await model.findOne(filter, projection, options);

  data.fullUrl = query.mainUrl + getFullUrl(data, query.urlID);

  if (!hasUrl)
    delete data.url;
  if (!hasCategory)
    delete data.category;
  if (!hasPublished)
    delete data.published;

  return data;
};
