import connect from '@lettercms/utils/lib/connection';
import * as socialModel from '@lettercms/models/socials';
import Base from '@lettercms/utils/lib/social/base';

const subdomain = 'davidsdevel';

export async function getAccounts() {
  await connect();

  const socials = {};
  
  const fb = await socialModel.Facebook.findOne({
    subdomain
  }, 'token pageId');

  const ig = await socialModel.Instagram.findOne({
    subdomain
  }, 'token userId');

  if (fb) {
    const {name, error} = await Base.api(`/${fb.pageId}`, {
      access_token: fb.token,
      fields: 'name'
    });

    if (error)
      socials.facebook = {
        status: 'auth-error'
      };
    else
      socials.facebook  = {
        name,
        picture: `https://graph.facebook.com/${fb.pageId}/picture`
      };
  }

  if (ig) {
    const {profile_picture_url, username, error} = await Base.api(`/${ig.userId}`, {
      access_token: ig.token,
      fields: 'username,profile_picture_url'
    });

    if (error)
      socials.instagram = {
        status: 'auth-error'
      };
    else
      socials.instagram = {
        name: username,
        picture: profile_picture_url
      };
  }

  return socials;
};
