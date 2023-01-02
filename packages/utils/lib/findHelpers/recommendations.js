import {find as baseFind, parseQuery} from '../findUtils';
import {getFullUrl} from '../posts';
import {find as findPosts} from './posts';

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

export const findOne = async (model, filter, query = {}) => {
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

  const {post: data} = await model.findOne(filter, 'post', {...options, populate: {
    path: 'post',
    select: projection
  }});

  data.fullUrl = query.mainUrl + getFullUrl(data, query.urlID);

  if (!hasUrl)
    delete data.url;
  if (!hasCategory)
    delete data.category;
  if (!hasPublished)
    delete data.published;

  return data;
};

export const findSimilars = async (model, query) => {
  // Post: {subdomain, url}
  const {post} = query;

  const {tags, _id} = await model.findOne(post, 'tags', {lean: true});

  const tagsMapped = tags.map(e => ({tags: {$in: e}}));

  const similarOpts = {
    subdomain: post.subdomain,
    $nor:[{_id}],
    postStatus: 'published',
    ...(tagsMapped.length > 0 ? {$or: tagsMapped} : {})
  };

  if (query.fields) {
    const splitted = query.fields.split(',');

    if (!splitted.includes('tags'))
      splitted.push('tags');

    query.fields = splitted.join(',');
  }

  const similars = await findPosts(model, similarOpts, query);

  //Order per Commons Similar tags
  let ordered = similars.data.map(e => {
    let matches = 0;

    e.tags.forEach(t => {
      if (tags.includes(t))
        matches++;
    });

    e.matches = matches;

    return e;
  })
  .sort((a,b) => a.matches > b.matches ? -1 : +1)
  .map(e => {
    delete e.matches;
    return e;
  });

  //If do not has similar posts returns differ posts
  if (ordered?.length < query.limit) {
    let ids = ordered.map(e => ({_id: e._id}));

    const rest = await findPosts(model, {
      subdomain: post.subdomain,
      postStatus: 'published',
      $nor: [{_id}].concat(ids),
    },
    {
      limit: query.limit - ordered.length,
      ...query
    });

    ordered = ordered.concat(rest.data);
  }

  return ordered;
};
