import pages from '@lettercms/models/pages';
import usage from '@lettercms/models/usages';

export default async function() {
  const {req, res} = this;

  const {subdomain} = req;

  const id = await pages.createPage(subdomain, req.body);
  await usage.updateOne({subdomain}, {$inc: {pages: 1}});

  res.json({
    status: 'OK',
    id
  });
};
