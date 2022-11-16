import blogs from '@lettercms/models/blogs';
import posts from '@lettercms/models/posts';
import revalidate from '@lettercms/utils/lib/revalidate';
import {getFullUrl} from '@lettercms/utils/lib/posts';

export default async function PatchBlog() {
  const {
    req,
    res
  } = this;

  const {
    subdomain
  } = req;

  const condition = {
    subdomain
  };

  const db = await blogs.findOneAndUpdate(condition, req.body, {select: 'mainUrl url'});

  if (req.body.url || req.body.mainUrl) {
    const prevUrlID = db.url;
    const prevBase = db.mainUrl;
    const urlID = req.body.url;
    const base = req.body.mainUrl;

    if (prevBase !== base) {
      revalidate(subdomain, base);
    }
    else if (
      req.body.title || 
      req.body.description ||
      req.body.url ||
      req.body.categories ||
      req.body.mainUrl ||
      req.body.thumbnail
    ) {
      revalidate(subdomain, prevBase);
    }

    if (prevUrlID !== urlID) {
      const _posts = await posts.find({subdomain, views: {$gt: 0}, postStatus: 'published'}, 'url published category', {lean: true});

      _posts.forEach(e => {
        let _base = base || prevBase;
        let oldBase = prevBase;

        const url = _base + getFullUrl(e, prevUrlID);
        const newUrl = oldBase + getFullUrl(e, urlID);

        revalidate(subdomain, url);
        revalidate(subdomain, newUrl);
      });
    }
  }
  
  res.json({
    status: 'OK'
  });
};