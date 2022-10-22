const generateCursorPagination = async (model, filter, opts) => {
  const {before, after} = opts;
  const {options, projection} = parseQuery(opts);

  if (before)
    filter._id = {$gt: before};
  else if (after)
    filter._id = {$lt: after};

  options.limit = options.limit + 1;
  
  const data = await model.find(filter, projection, options);

  const paging = {
    cursors: {
    }
  };

  const hasMore = data.length === options.limit;

  if (hasMore) {
    data.pop();
      
    const beforeCursor = data[data.length - 1]._id;
      
    paging.cursors.before = beforeCursor.toString();
  }

  if (before) {
    paging.cursors.after = data[0]._id.toString();
  }

  return {
    data,
    paging
  };
};

export const parseFields = fields => {
  const populationSelect = {};
  const select = [];
  const splittedFields = fields.split(',').map(e => '_base.' + e);

  const getFields = f => {
    let path = f[0];

    if (!populationSelect[f[0]])
      populationSelect[f[0]] = [f[1]];
    else
      populationSelect[f[0]].push(f[1]);

    if (f.length > 1) {
      getFields(f.slice(1));
    }
  };

  splittedFields.forEach(e => {
    const selectSplit = e.split('.');

    if (!select.includes(selectSplit[0]))
      select.push(selectSplit[0]);

    getFields(selectSplit);
  });

  const ent = Object.entries(populationSelect).map(e => {

    const values = Array.from(new Set(e[1]));
    return [e[0], values];
  });

  const entriesMap = new Map(ent);

  const getPopulation = path => {
    const selections = entriesMap.get(path);

    const opts = {
      path
    };

    let populate;

    if (selections) {
      if (selections[0] !== '*')
        opts.select = selections.join(' ');

      for(let e of selections) {
        const existsPopulate = entriesMap.get(e);

        if (existsPopulate?.[0]) {
          populate = getPopulation(e);
          break;
        }
      }
    }

    if (path === '_base' && !populate && !opts.select) 
      return opts.select;

    if (path === '_base' && populate?.select === '*') {
      return {
        populate
      };
    }

    if (path === '_base' && populate) {
      return {
        populate,
        select: opts.select
      };
    }
    if (path === '_base' && opts.select)
      return opts.select;
    


    if (populate)
      opts.populate = populate;

    return opts;
  };

  return getPopulation('_base');
};

export const parseQuery = query => {
  const {
    fields,
    sort,
    page,
    limit = 10
  } = query;

  let options = {
    limit: +limit
  };
  let projection = null;

  if (fields) {
    const parsedFields = parseFields(fields);

    if (typeof parsedFields === 'string')
      projection = parsedFields;
    else {
      projection = parsedFields.select;

      if (parsedFields.populate)
        options.populate = parsedFields.populate;
    }
  }

  if (!options.populate)
    options.lean = true;
  if (sort)
    options.sort = {
      [sort]: -1
    };

  if (page)
    options.skip = (page - 1) * limit;

  return {
    projection,
    options
  };
};

export async function find(model, filter, opts = {limit: 10}) {
  if (!opts.page)
    return generateCursorPagination(model, filter, opts);

  const {options, projection} = parseQuery(opts);
  const {page, limit = 10} = opts;

  const data = await model.find(filter, projection, options);
  const total = await model.countDocuments(filter);
  
  const paging = {
    page: +page,
    total: Math.ceil(total / limit)
  };
  return {
    data,
    paging
  };
}


export async function findOne(model, filter, opts = {}) {
  const {options, projection} = parseQuery(opts);

  return model.findOne(filter, projection, options);
}
