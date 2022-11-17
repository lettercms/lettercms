import getBucket from './getBucket';

const list = async (subdomain, query = {}) => {
  try {
    const {
      limit = 10,
      before
    } = query;

    const bucketOpts = {
      prefix: subdomain,
      autoPaginate: false,
      maxResults: limit,
    };

    if (before)
      bucketOpts.pageToken = before;

    const bucket = getBucket();

    const [__, _, data] = await bucket.getFiles(bucketOpts);

    const paging = {
      cursors: {}
    };

    return Promise.resolve({
      data: data.items || [],
      paging
    });
  } catch(err) {
    return Promise.reject(err);
  }
};

export default list;
