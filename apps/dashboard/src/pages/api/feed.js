import connect from '@lettercms/utils/lib/connection';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import {find} from '@lettercms/utils/lib/findHelpers/posts';
import {withSentry} from '@sentry/nextjs';
import {Feed} from 'feed';

async function feed(req, res) {
    try {
      await connect();

      const {description, thumbnail: blogThumbnail, url: urlID} = await blogs.findOne({subdomain: 'davidsdevel'}, 'description thumbnail url', {lean: true});

      const { data: postData } = find(posts, {
        subdomain: 'davidsdevel',
        postStatus: 'published'
      }, {
        urlID,
        limit: 1000,
        fields: 'title,url,description,content,updated,thumbnail'
      });

      const feed = new Feed({
        title: 'Blog | LetterCMS',
        description,
        id: 'https://www.lettercms.com/blog',
        link: 'https://www.lettercms.com/blog',
        language: 'es',
        image: blogThumbnail,
        favicon: 'https://www.lettercms.com/favicon.ico',
        copyright: `Todos los derechos reservados ${(new Date()).getFullYear()}, LetterCMS`,
        updated: new Date(),
        generator: 'LetterCMS',
        feedLinks: {
          atom: 'https://www.lettercms.com/feed',
        },
        author: {
          name: 'David González',
          email: 'davidsdevel@gmail.com',
          link: 'https://www.lettercms.com/blog',
        },
      });

      postData.forEach(({
        title, url, description, content, updated, thumbnail
      }) => {
        feed.addItem({
          title,
          id: `https://www.lettercms.com/blog/${url}`,
          link: `https://www.lettercms.com/blog/${url}`,
          description,
          content,
          author: [
            {
              name: 'David González',
              email: 'davidsdevel@gmail.com',
              link: 'https://www.lettercms.com/blog',
            },
          ],
          date: typeof updated === 'string' ? new Date(updated) : updated,
          image: thumbnail
        });
      });

      const rss = feed.rss2();

      res.setHeader('Content-Type', 'text/xml; charset=UTF-8');
      res.write(rss);

      res.end();
    } catch (err) {
      res.status(500).send(err);
    }
  }

export default withSentry(feed);
