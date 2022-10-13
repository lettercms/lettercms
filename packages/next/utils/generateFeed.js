import sdk from '@lettercms/node';
import {Feed} from 'feed';

sdk.init({
  id: process.env.LETTERCMS_ID,
  secret: process.env.LETTERCMS_SECRET
});

async function feed(req, res) {
    try {
      const {subdomain, customDomain, mainUrl, description, thumbnail: blogThumbnail, owner} = await sdk.blogs.single([
        'description',
        'thumbnail',
        'title',
        'customDomain',
        'mainUrl',
        'subdomain',
        'owner.name',
        'owner.lastname',
        'owner.email'
      ]);

      const { data: posts } = await sdk.posts.all({
        status: 'published',
        limit: 1000,
        fields: [
          'title',
          'fullUrl',
          'description',
          'content',
          'updated',
          'thumbnail',
          'author.name',
          'author.lastname',
          'author.email'
        ]
      });

      const domain = customDomain || `https://${subdomain}.lettercms.com`;
      const homePath = domain + mainUrl;

      const feed = new Feed({
        title,
        description,
        id: domain,
        link: homePath,
        language: 'es',
        image: blogThumbnail,
        favicon: `${domain}/favicon.ico`,
        copyright: `Todos los derechos reservados ${(new Date()).getFullYear()}, ${title}`,
        updated: new Date(),
        generator: 'LetterCMS',
        feedLinks: {
          atom: `${domain}${req.url}`,
        },
        author: {
          name: `${owner.name} ${owner.lastname}`,
          email: owner.email,
          link: domain,
        },
      });

      posts.forEach(({
        title, fullUrl, description, content, updated, thumbnail, author
      }) => {
        feed.addItem({
          title,
          id: `${domain}/${fullUrl}`,
          link: `${domain}/${fullUrl}`,
          description,
          content,
          author: [
            {
              name: `${author.name} ${author.lastname}`,
              email: author.email,
              link: domain
            },
          ],
          date: new Date(updated),
          image: thumbnail
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

export default feed;


/*

import { Feed } from "feed";

const feed = new Feed({
  title: "Feed Title",
  description: "This is my personal feed!",
  id: "http://example.com/",
  link: "http://example.com/",
  language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: "http://example.com/image.png",
  favicon: "http://example.com/favicon.ico",
  copyright: "All rights reserved 2013, John Doe",
  updated: new Date(2013, 6, 14), // optional, default = today
  generator: "awesome", // optional, default = 'Feed for Node.js'
  feedLinks: {
    json: "https://example.com/json",
    atom: "https://example.com/atom"
  },
  author: {
    name: "John Doe",
    email: "johndoe@example.com",
    link: "https://example.com/johndoe"
  }
});

posts.forEach(post => {
  feed.addItem({
    title: post.title,
    id: post.url,
    link: post.url,
    description: post.description,
    content: post.content,
    author: [
      {
        name: "Jane Doe",
        email: "janedoe@example.com",
        link: "https://example.com/janedoe"
      },
      {
        name: "Joe Smith",
        email: "joesmith@example.com",
        link: "https://example.com/joesmith"
      }
    ],
    contributor: [
      {
        name: "Shawn Kemp",
        email: "shawnkemp@example.com",
        link: "https://example.com/shawnkemp"
      },
      {
        name: "Reggie Miller",
        email: "reggiemiller@example.com",
        link: "https://example.com/reggiemiller"
      }
    ],
    date: post.date,
    image: post.image
  });
});

feed.addCategory("Technologie");

feed.addContributor({
  name: "Johan Cruyff",
  email: "johancruyff@example.com",
  link: "https://example.com/johancruyff"
});

console.log(feed.rss2());

console.log(feed.atom1());

console.log(feed.json1());


*/