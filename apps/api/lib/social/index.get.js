import * as socials from '@lettercms/models/socials';
import {Facebook, Instagram} from '@lettercms/utils/lib/social';

export default async function() {
  const {req, res} = this;

  const {subdomain} = req;

  const {feeds = '', limit} = req.query;

  const data = {};

  const promises = [];

  const hasInstagram = /(,\s*)?instagram(,\s*)?/.test(feeds) || !feeds;
  const hasFacebook = /(,\s*)?facebook(,\s*)?/.test(feeds) || !feeds;

  if (hasInstagram) {
    const instagramPromise = socials.Instagram.findOne({
      subdomain
    }, 'userId token')
      .then(({userId, token}) => {
        const ig = new Instagram(userId, token);
    
        return ig.getPosts();
      });

    promises.push(instagramPromise);
  }
  
  if (hasFacebook) {
    const facebookPromise = socials.Facebook.findOne({
      subdomain
    }, 'token pageId')
      .then(({token, pageId}) => {
        const fb = new Facebook(pageId, token);
    
        return fb.getPosts({
          limit,
          fields: 'attachments,message,id,sheduled_publish_time,full_picture'
        });
      });

    promises.push(facebookPromise);
  }

  try {
    const resolves = await Promise.all(promises);
    
    if (hasInstagram)
      data.instagram = resolves[0];
    
    if (hasFacebook) {
      if (hasInstagram)
        data.facebook = resolves[1];
      else
        data.facebook = resolves[0];
    }

    res.json({data});
  } catch(err) {
    res.status(500).send(err);
  }
};