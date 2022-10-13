import * as socialModel from '@lettercms/models/socials';
import Base from '@lettercms/utils/lib/social/base';

export default async function() {
  const {req, res} = this;

  const {include} = req.query;
  const {subdomain} = req;

  const socialIncludes = include ? include.split(/\s*,\s*/g) : [];

  const sendAll = !include;

  const socials = {};
  //const parsedFields = fields ? fields.replace(/\s*,\s*/g, ' ') : [];

  const hasIG = await socialModel.Instagram.exists({subdomain});
  const hasFB = await socialModel.Facebook.exists({subdomain});

  if ((sendAll || socialIncludes.indexOf('facebook') > -1) && hasFB) {
    const {token, pageId} = await socialModel.Facebook.findOne({
      subdomain
    }, 'token pageId');

    const {cover, name, username, error} = await Base.api(`/${pageId}`, {
      access_token: token,
      fields: 'name,username,cover'
    });

    if (error) {
      socials.facebook = {
        status: 'auth-error'
      };
    } else {
      socials.facebook  = {
        subdomain,
        pageId,
        token: token,
        name,
        username,
        cover: cover.source,
        picture: `https://graph.facebook.com/${pageId}/picture`
      };
    }

  }

  if ((sendAll || socialIncludes.indexOf('instagram') > -1) && hasIG) {
    const {token, userId} = await socialModel.Instagram.findOne({
      subdomain
    }, 'token userId');

    const {name, profile_picture_url, username, error} = await Base.api(`/${userId}`, {
      access_token: token,
      fields: 'name,profile_picture_url,username'
    });

    if (error) {
      socials.instagram = {
        status: 'auth-error'
      };
    } else {
      socials.instagram = {
        userId,
        subdomain,
        token,
        name,
        username,
        picture: profile_picture_url
      };
    }
  }

  res.json(socials);
};