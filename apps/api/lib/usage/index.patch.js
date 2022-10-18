import getImg from '@/lib/image/operations/get';
import usage from '@lettercms/models/usages';

export default async function PatchUsage() {
  const {req, res} = this;

  const {subdomain} = req;
  const {file} = req.body;
  try {

    const img = await getImg(subdomain, file);

    await usage.updateOne({subdomain}, {$inc: {storageSize: -img.size}});

    res.json({
      status: 'OK'
    });
  } catch(err) {
    if (err.code === 'ENOTFOUND') {
      res.statusCode = 404;

      return res.json({
        status: 'not-found',
        message: `Image ${file} does not exists`
      });
    }
    res.statusCode = 500;

    return res.json({
      status: 'Server Error'
    });
  }
}

