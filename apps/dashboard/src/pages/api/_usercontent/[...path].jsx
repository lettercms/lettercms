import getBucket from '@/lib/api/image/operations/getBucket';
import sharp from 'sharp';

let cacheBucket = null;

export default async function usercontent(req, res) {
  const {w, q, h, path} = req.query;

  let transformOpts = {};
  
  const bucket = cacheBucket ? cacheBucket : await getBucket();
  const remote = bucket.file(path.join('/'));

  const transform = sharp().webp({
    quality: parseInt(q || '75')
  });

  if (w)
    transformOpts.width = parseInt(w);
  if (h)
    transformOpts.height = parseInt(h);

  const transformPipe = transform.resize(transformOpts);

  //Define Inmutable cache to Cloudflare Proxy
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  remote
    .createReadStream()
    .pipe(transformPipe)
    .pipe(res);
}
