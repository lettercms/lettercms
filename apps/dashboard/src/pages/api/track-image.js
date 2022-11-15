import { createApi } from 'unsplash-js';

const api = createApi({
  accessKey: process.env.UNSPLASH_KEY
});


/**
 * Send download notification to Unsplash when put an image on post
 * See https://help.unsplash.com/api-guidelines/unsplash-api-guidelines 
 */
export default async function trackImage(req, res) {

  if (req.method !== 'GET')
    return res.status(405).send('Method not allowed');

  const {url} = req.query;

  api.photos.trackDownload({ downloadLocation: 'https://api.unsplash.com/photos' + url });

  res.json({});
}
