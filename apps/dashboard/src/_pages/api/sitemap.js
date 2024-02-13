import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {find} from '@lettercms/utils/lib/findHelpers/posts';

const subdomain = process.env.LETTERCMS_SUBDOMAIN; //'davidsdevel';


export default async function sitemap(req, res) {
    try {
      await connect();

      const {customDomain, url: urlID} = await blogs.findOne({subdomain}, 'customDomain url', {lean: true});
      const {data} = await find(posts, {
        subdomain,
        postStatus: 'published'
      }, {
        fields: 'updated,fullUrl',
        urlID,
        limit: 1000
      });

      const domain = 'https://' + (customDomain || subdomain + '.lettercms.vercel.app');

      const mapped = data.map(({ fullUrl, updated }) => `<url><changefreq>monthly</changefreq><loc>${domain}/blog${fullUrl}</loc><lastmod>${updated}</lastmod><priority>1</priority></url>`);

      const finalXML = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${domain}</loc>
          <changefreq>monthly</changefreq>
          <priority>1</priority>
        </url>
        <url>
          <loc>${domain}/blog</loc>
          <changefreq>weekly</changefreq>
          <priority>1</priority>
        </url>
        <url>
          <loc>${domain}/search</loc>
          <changefreq>monthly</changefreq>
          <priority>0</priority>
        </url>
        <url>
          <loc>${domain}/terms</loc>
          <changefreq>monthly</changefreq>
          <priority>1</priority>
        </url>
        <url>
          <loc>${domain}/privacy</loc>
          <changefreq>monthly</changefreq>
          <priority>1</priority>
        </url>
        ${mapped.join('')}
      </urlset>`;

      res.setHeader('Content-Type', 'application/xml');
      
      res.write(finalXML);
      
      res.end();
    } catch (err) {
      res.status(500).send(err);
    }
  }
