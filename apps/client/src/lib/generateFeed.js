import {Letter} from '@lettercms/sdk';
import jwt from 'jsonwebtoken';
import {getSubdomain} from './utils';
import {Feed} from 'feed';

export default async function feed(req, res) {
  try {
    const hostname = req.headers.host;
    const subdomain = process.env.NODE_ENV === 'production'  ? hostname.replace('.lettercms.vercel.app', '') : hostname.replace('.localhost:3002', '');

      const token = jwt.sign({subdomain}, process.env.JWT_AUTH);
      const sdk = new Letter(token);

      const {title, description, customDomain, ownerEmail, thumbnail: blogThumbnail} = await sdk.blogs.single([
        'title',
        'description',
        'customDomain',
        'ownerEmail',
        'thumbnail'
      ]);

      const { data: posts } = await sdk.posts.all({
        status: 'published',
        fields: [
          'title',
          'url',
          'description',
          'content',
          'updated',
          'thumbnail'
        ]
      });

      const {name, lastname, website} = await sdk.accounts.single(ownerEmail, [
        'name',
        'lastname',
        'website'
      ]);

      const domain = customDomain || `https://${subdomain}.letterspot.com`;

      const feed = new Feed({
        title,
        description,
        id: domain,
        link: domain,
        language: 'es',
        image: blogThumbnail,
        favicon: `'${domain}/favicon.ico'`,
        copyright: `Todos los derechos reservados ${(new Date()).getFullYear()}, ${title}`,
        updated: new Date(),
        generator: 'LetterCMS',
        feedLinks: {
          atom: `${domain}/feed`,
        },
        author: {
          name: `${name} ${lastname}`,
          email: ownerEmail,
          link: website,
        },
      });

      posts.forEach(({
        title, url, description, content, updated, thumbnail, author
      }) => {
        feed.addItem({
          title,
          id: `${domain}/${url}`,
          link: `${domain}/${url}`,
          description,
          content,
          author: [
            {
              name: `${name} ${lastname}`,
              email: ownerEmail,
              link: website,
            },
          ],
          contributor: [ //TODO: use contributors
            {
              name: `${name} ${lastname}`,
              email: ownerEmail,
              link: website,
            },
          ],
          date: typeof updated === 'string' ? new Date(updated) : updated,
          image: thumbnail,
        });
      });

      const rss = feed.rss2();

      res.setHeader('Content-Type', 'text/xml; charset=UTF-8');
      res.write(rss);

      res.end();
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
