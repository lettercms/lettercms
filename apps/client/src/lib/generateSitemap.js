import {Letter} from '@lettercms/sdk';
import jwt from 'jsonwebtoken';
import {getSubdomain} from './utils';

export default async function sitemap(req, res) {
    try {
      const hostname = req.headers.host;
      const subdomain = process.env.NODE_ENV === 'production'  ? hostname.replace('.lettercms.vercel.app', '') : hostname.replace('.localhost:3002', '');

      const token = jwt.sign({subdomain}, process.env.JWT_AUTH);
      
      const sdk = new Letter(token);

      const {customDomain} = await sdk.blogs.single([
        'customDomain'
      ]);

      const { data: posts } = await sdk.posts.all({
        status: 'published',
        fields: [
          'updated',
          'fullUrl'
        ]
      });

      const {data: pages} = await sdk.pages.all({
        status: 'published',
        fields: [
          'updated',
          'url'
        ]
      });

      const data = Object.assign([], posts, pages);
      
      const domain = customDomain || `https://lettercms-client-davidsdevel.vercel.app/${subdomain}`;

      const mapped = data.map(({ fullUrl, updated }) => `<url><changefreq>monthly</changefreq><loc>https://blog.davidsdevel.com/${fullUrl}</loc><lastmod>${updated}</lastmod><priority>1</priority></url>`);

      const finalXML = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${domain}</loc>
          <changefreq>monthly</changefreq>
          <priority>1</priority>
        </url>
        ${mapped.join('')}
      </urlset>`;

      res.writeHeader(200, {
        'Content-Type': 'application/xml',
      });

      res.end(finalXML);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }