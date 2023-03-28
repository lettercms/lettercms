import getObject from './operations/get';
import deleteObject from './operations/delete';
import usage from '@lettercms/models/usages';

export default async function deleteImage() {
  const {req: {subdomain, query}, res} = this;

  const data = await getObject(subdomain, query.name);

  await deleteObject(subdomain, query.name);
  //await usage.updateOne({subdomain}, {$inc: {storageSize: -data.size}});
  //TODO: purge file from cloudflare cache

  res.json({
    status: 'OK',
    id: query.name
  });
};
