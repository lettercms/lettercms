import getBucket from '../lib/getBucket';
import {createReadStream} from 'fs';
import sharp from 'sharp';

let cacheBucket = null;

export default function usercontent(req, res) {
  const {w, q, h} = req.query
  let transformOpts = {};
  
  const bucket = cacheBucket ? cacheBucket : await getBucket();
  const remote = bucket.file(req.url.split('?')[0]);

  const transform = sharp().webp({
    quality: parseInt(q || '75')
  });

  if (w)
    transformOpts.width = parseInt(w);
  if (h)
    transformOpts.height = parseInt(h);

  const transformPipe = transform.resize(transformOpts);

  //Define Inmutable to Cloudflare Proxy
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  remote
    .createReadStream();
    .pipe(transformPipe)
    .pipe(res);
}
