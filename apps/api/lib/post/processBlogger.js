import {XMLParser} from 'fast-xml-parser';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';

const parser = new XMLParser({
  ignoreAttributes : false  
});

export default async function processBlogger(file, subdomain, author) {

  const parsed = parser.parse(file);
  const {entry} = parsed.feed;

  const postData = [];
  let tags = {};

  entry.forEach(e => {
    if (e.id.includes('.post-')) {
      const data = parseBlogger(e, subdomain, author);

      if (data.postStatus === 'published') {
        data.tags.forEach(tag => {
          tags[tag] = (tags[tag] || 0) + 1;
        });
      }

      postData.push(data);
    }
  });

  console.log(tags);
  await blogs.updateOne({subdomain}, {tags});

  return posts.insertMany(postData);
}

function parseBlogger(data, subdomain, author) {
  let tags = [];
  let url;

  //Get Post tags if exists
  if (Array.isArray(data.category))
    tags = data
      .category
      .map(e => e['@_term'])
      .filter(e => !e.startsWith('http://'));

  //Get post URL
  data.link.forEach(e => {
    if (e['@_rel'] === 'alternate') {
      const splittedUrl = e['@_href'].split('/');
      const lastIndex = splittedUrl.pop();

      url = lastIndex.replace('.html', '');
    }
  });

  const content = data.content['#text'];
  const created = new Date(data.published);
  const published = data['app:control'] ? null : created;
  
  //Parse post text to mongo search index
  const text = content?.split('<').map(e => e.split('>')[1]).join('');

  return {
    title: data.title['#text'],
    thumbnail: data['media:thumbnail']?.['@_url'].replace(/s\d*-(w\d*-)?c(-h\d*)?/, 'w1400'),
    postStatus: published ? 'published' : 'draft',
    description: text?.split('.')[0],
    updated: new Date(data.updated),
    published,
    author,
    created,
    content,
    text,
    tags,
    url,
    subdomain
  };
}
