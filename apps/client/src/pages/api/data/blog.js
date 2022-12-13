import {getPathType, getBlog} from '@/lib/mongo/blogs';
import {getPost} from '@/lib/mongo/posts';
import {captureException} from '@sentry/nextjs';

export default async function getData(req, res) {
  if (req.method !== 'GET')
    return res.status(405);
  
  try {
    const {paths, subdomain} = req.query;

    const pathType = await getPathType(subdomain, paths?.split(',') || []);

    if (pathType === 'no-blog')
      return res.json({
        type: 'no-blog'
      });

    let props = null;
      
    if (pathType === 'main')
      props = await getBlog(subdomain);
    if (pathType === 'post')
      props = await getPost(subdomain, paths);
    if (pathType === 'not-found')
      return res.json({
        type: 'not-found'
      });

    return res.json({
      type: pathType,
      ...props
    });
  } catch(err) {
    throw err;
  }
}
