import * as socials from '@lettercms/models/socials';
import {Facebook, Instagram} from '@lettercms/utils/lib/social';

export default async function() {
  const {
    req,
    res,
  } = this;

  const {social} = req.query;
  const {subdomain} = req;

  if (social === 'instagram') {
    const {userId, token} = await socials.Instagram.findOne({
      subdomain
    }, 'userId token');

    const ig = new Instagram(userId, token);

    const data = await ig.getPosts();

    return res.json(data);
  }

  if (social === 'facebook') {
    const {token, pageId} = await socials.Facebook.findOne({
      subdomain
    }, 'token pageId');


    const fb = new Facebook(pageId, token);

    const data = await fb.getPosts({
      fields: 'message,id,created_time,full_picture'
    });

    return res.json(data);
  }
   if (social === 'twitter') {
    /*const {token, pageId} = Twitter.findOne({
      subdomain
    }, null, 'token pageId');*/

    /*
    const twt = new Twitter(pageId, token);

    const data = await twt.getTwits();

    return res.json(data);*/

    return res.json({
      data: []
    });
  }
};