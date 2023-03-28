import * as socials from '@lettercms/models/socials';
import usage from '@lettercms/models/usages';
import {Facebook, Instagram} from '@lettercms/utils/lib/social';
import schedule from '@lettercms/utils/lib/schedule';
import jwt from 'jsonwebtoken';

export default async function CreateSocialAccount() {
  const {req, res} = this;

  const {subdomain} = req;

  const {feeds, message, images} = req.body;

  const hasIg = feeds.indexOf('instagram') > -1;

  if (hasIg && !images) 
    return res.json({
      status: 'social/instagram-error',
      message: 'Instagram must have at least 1 image'
    });


  if (feeds.indexOf('facebook') > -1) {
    const {token, pageId} = await socials.Facebook.findOne({
      subdomain
    }, 'pageId token');

    const fb = new Facebook(pageId, token);

    await fb.publishPost(message, req.body);
    
    if (req.body.schedule)
      await usage.updateOne({subdomain}, {$inc: {socialSchedule: 1}});

  }

  if (hasIg) {
    const {token, userId} = await socials.Instagram.findOne({
      subdomain
    }, 'userId token');

    const ig = new Instagram(userId, token);

    if (req.body.schedule) {
      await schedule(req.body.schedule, {
        url: `https://${process.env.VERCEL_URL}/api/social/instagram/qstash`,
        token: jwt.sign({subdomain}, process.env.JWT_AUTH),
        body: {
          ...req.body,
          schedule: undefined
        }
      });

      await usage.updateOne({subdomain}, {$inc: {socialSchedule: 1}});
    }
    else
      await ig.publishPost(message, images);
  }

  res.json({
    status: 'OK'
  });
};