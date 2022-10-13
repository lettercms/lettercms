import getBucket from './getBucket';

const getObj = async (subdomain, name) => {
  try {
    const bucket = getBucket();

    const [data] = await bucket.file(`${subdomain}/${name}`).getMetadata();
    return Promise.resolve(data);
  } catch(err) {
    throw err;
  }
};

export default getObj;
