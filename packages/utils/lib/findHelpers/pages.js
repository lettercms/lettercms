import {find as baseFind} from '../findUtils';

export const find = async (model, filter, opts = {}) => {
  if (opts.status) {
    opts.sort = opts.status === 'published' ? 'published' : (opts.sort || 'created');
  }

  const pages = await baseFind(model, filter, opts);


  const [draft, published] = await Promise.all([
    model.countDocuments({subdomain: filter.subdomain, pageStatus: 'draft'}),
    model.countDocuments({subdomain: filter.subdomain, pageStatus: 'published'}),
  ]);

  pages.total = {
    draft,
    published,
    all: draft + published
  };

  return pages;
};
