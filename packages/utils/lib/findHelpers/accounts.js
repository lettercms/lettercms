import {find as baseFind, parseQuery} from '../findUtils';

const accountsUtils = {};

export const find = async (model, filter, opts = {}) => {
  if (!opts.fields) {

    opts.fiels = '-password';
  } else {
    let splitted = opts.fields.split(',');
    
    if (splitted.includes('password'))
      splitted = splitted.filter(e => e !== 'password');

    opts.fields = splitted.join(',');
  }

  const data = await baseFind(model, filter, opts);

  const [collaborator, single] = await Promise.all([
    model.countDocuments({subdomain: filter.subdomain, role: 'collaborator'}),
    model.countDocuments({subdomain: filter.subdomain, role: 'single'}),
  ]);

  data.total = {
    collaborator,
    single,
    all: collaborator + single
  };

  return data;
};

export const findOne = async (model, filter, query) => {
  if (!query.fields) {
    query.fiels = '-password';
  } else {
    let splitted = query.fields.split(',');
    
    if (splitted.includes('password'))
      splitted = splitted.filter(e => e !== 'password');

    query.fields = splitted.join(',');
  }

  const {options, projection} = parseQuery(query);

  return model.findOne(filter, projection, options);
};
