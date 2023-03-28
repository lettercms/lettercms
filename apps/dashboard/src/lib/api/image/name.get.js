import getObject  from './operations/get';
import parseFile  from './parseFile';

export default async function getImage() {
  const {req: {subdomain, params}, res} = this;

  const data = await getObject(subdomain, params.name);

  res.json(parseFile(data));
};
