import {find as baseFind, parseQuery} from '../findUtils';
import {getFullUrl} from '../posts';

export const find = async (model, filter, opts = {}) => {
  let hasUrl = false;
  let hasPublished = false;
  let hasCategory = false;
  let hasFullUrl = false;
  let hasStatus = false;

  if (opts.fields) {
    const splitted = opts.fields.split(',');

    hasFullUrl = splitted.includes('fullUrl');
    hasUrl = splitted.includes('url');
    hasCategory = splitted.includes('category');
    hasPublished = splitted.includes('published');
    hasStatus = splitted.includes('postStatus');

    if (hasFullUrl) {
      if (!hasUrl)
        splitted.push('url');
      if (!hasCategory)
        splitted.push('category');
      if (!hasPublished)
        splitted.push('published');
      if (!hasStatus)
        splitted.push('postStatus');
    }

    opts.fields = splitted.join(',');
  }

  if (opts.status) {
    opts.sort = opts.status === 'published' ? 'published' : (opts.sort || 'created');
  }

  const posts = await baseFind(model, filter, opts);

  posts.data = posts.data.map(e => {
    if (e.postStatus !== 'published')
      return e;

    e.fullUrl = opts.mainUrl + getFullUrl(e, opts.urlID);

    if (!hasUrl)
      delete e.url;
    if (!hasCategory)
      delete e.category;
    if (!hasPublished)
      delete e.published;
    if (!hasStatus)
      delete e.postStatus;

    return e;
  });

  const [draft, published, imported] = await Promise.all([
    model.countDocuments({subdomain: filter.subdomain, postStatus: 'draft'}),
    model.countDocuments({subdomain: filter.subdomain, postStatus: 'published'}),
    model.countDocuments({subdomain: filter.subdomain, postStatus: 'imported'})
  ]);

  posts.total = {
    draft,
    published,
    imported,
    all: draft + published + imported
  };

  return posts;
};

export const findOne = async (model, filter, query) => {
  let hasUrl = false;
  let hasPublished = false;
  let hasCategory = false;
  let hasFullUrl = false;
  let hasStatus = false;

  if (query.fields) {
    const splitted = query.fields.split(',');

    hasFullUrl = splitted.includes('fullUrl');
    hasUrl = splitted.includes('url');
    hasCategory = splitted.includes('category');
    hasPublished = splitted.includes('published');
    hasStatus = splitted.includes('postStatus');

    if (hasFullUrl) {
      if (!hasUrl)
        splitted.push('url');
      if (!hasCategory)
        splitted.push('category');
      if (!hasPublished)
        splitted.push('published');
      if (!hasStatus)
        splitted.push('postStatus');
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
  if (!hasStatus)
    delete data.postStatus;

  return data;
};
