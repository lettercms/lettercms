
const Generate = obj => {

  const data = obj.feed.entry.map(e => {
      // eslint-disable-next-line
      if (!/\.post-/.test(e.id._text))
        return false;

      let tags = [];
      let url;

      if (Array.isArray(e.category)) {
        tags = e.category
          // eslint-disable-next-line
          .map((cat) => (/https?:\/\/schemas\.google\.com\//.test(cat._attributes.scheme) ? undefined : cat._attributes.term.replace(/,/g, '')))
          .filter((a) => a);
      }

      e.link.forEach((link) => {
        if (link._attributes.rel === 'alternate') {
          const urlSplitted = link._attributes.href.split('/');

          url = urlSplitted[urlSplitted.length - 1].replace('.html', '');
        }
      });

      return {
        // eslint-disable-next-line
        title: e.title._text,
        thumbnail: e['media:thumbnail'] ? e['media:thumbnail']._attributes.url.replace(/\/s\d+(-w\d+)?(-c)?(-\d+)?\//, '/s1400/') : '',
        // eslint-disable-next-line
        published: !e['app:control'] ? new Date(e.published._text) : undefined,
        // eslint-disable-next-line
        created: new Date(e.published._text),
        // eslint-disable-next-line
        updated: new Date(e.updated._text),
        // eslint-disable-next-line
        content: e.content._text || undefined,
        tags,
        url,
        postStatus: 'imported'
      };
    }).filter(e => e);

  return data;
};

export default Generate;
