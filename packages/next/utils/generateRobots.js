import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/models/blogs';
import { withSentry } from '@sentry/nextjs';

async function Robots(req, res) {
  const hostname = req.headers.host;
  const subdomain = process.env.NODE_ENV === 'production'  ? hostname.replace('.lettercms.vercel.app', '') : hostname.replace('.localhost:3002', '');

  await connect();

  const blog = await blogs.findOne({subdomain}, 'customDomain hasCustomRobots isVisible robots', {lean: true});

  let robots;

  if (blog.hasCustomRobots)
    robots = blog.robots;
  else {
    if (blog.isVisible) {
      robots = `User-agent: *
        Disallow: /search
        Disallow: /feed
        Allow: /

        Sitemap: https://${blog.customDomain || subdomain + '.lettercms.vercel.app'}/sitemap.xml`;
    }
    else
      robots = `User-agent: *
        Disallow: *`;
  }
    
  res.send(robots.replace(/\n\s*/g, '\n'));
}

export default withSentry(Robots);
