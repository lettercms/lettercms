import {find as baseFind, parseQuery} from '../findUtils';

export const find = async (model, filter, opts = {}) => {
  let hasPassword = true;

  if (opts.fields) {
    let splitted = opts.fields.split(',');
    
    if (splitted.includes('password'))
      splitted = splitted.filter(e => e !== 'password');
    else
      hasPassword = false;

    opts.fields = splitted.join(',');
  }

  const data = await baseFind(model, filter, opts);

  const [admin, collaborator, single] = await Promise.all([
    model.countDocuments({subdomain: filter.subdomain, role: 'admin'}),
    model.countDocuments({subdomain: filter.subdomain, role: 'collaborator'}),
    model.countDocuments({subdomain: filter.subdomain, role: 'single'}),
  ]);

  data.total = {
    admin,
    collaborator,
    single,
    all: collaborator + single + admin
  };

  if (hasPassword)
    data.data = data.data.map(e => {
      delete e.password;

      return e;
    });

  return data;
};

export const findOne = async (model, filter, query) => {
  if (!query.fields) {
    query.fields = '-password';
  } else {
    let splitted = query.fields.split(',');
    
    if (splitted.includes('password'))
      splitted = splitted.filter(e => e !== 'password');

    query.fields = splitted.join(',');
  }

  const {options, projection} = parseQuery(query);

  return model.findOne(filter, projection, options);
};
