import getObject from './operations/get';
import deleteObject from './operations/delete';
import usage from '@lettercms/models/usages';

export default async function deleteImage() {
  const {req: {subdomain, params}, res} = this;

  const data = await getObject(subdomain, params.name);

  await deleteObject(subdomain, params.name);
  await usage.updateOne({subdomain}, {$inc: {storageSize: -data.size}});
  //TODO: purge file from cloudflare cache

  res.json({
    status: 'OK'
  });
};
