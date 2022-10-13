import {withSentry} from '@sentry/nextjs';
import { createApi } from 'unsplash-js';

const api = createApi({
  accessKey: process.env.UNSPLASH_KEY
});

async function SearchImages(req, res) {

  if (req.method !== 'GET')
    return res.status(405).send('Method not allowed');

  const {q, page} = req.query;

  try {

    const photos = await api.search.getPhotos({
      query: q,
      page: parseInt(page || 1),
      perPage: 20,
    });

    const mapped = photos.response.results.map(e => {
      return {
        url: e.urls.regular,
        thumbnail: e.urls.thumb,
        raw: e.urls.raw,
        width: e.width,
        height: e.height,
        color: e.color,
        download: e.links.download_location,
        user: {
          name: e.user.name,
          profile: e.user.links.html + '?utm_source=lettercms&utm_medium=referral '
        }
      };
    });

    res.json(mapped);
  } catch(err) {
    console.error(err);
  }
}

export default withSentry(SearchImages);
