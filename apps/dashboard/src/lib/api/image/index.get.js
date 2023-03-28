import list from './operations/list';
import parseFile from './parseFile';

export default async function listImages() {
  const {req: {subdomain, query}, res} = this;

  const {data, paging} = await list(subdomain, query);

  res.json({
    data: data.map(parseFile),
    paging
  });
};
