import * as socials from '@lettercms/models/socials';
import Base from '@lettercms/utils/lib/social/base';

export default async function() {
  const {req: {subdomain, body}, res} = this;

  const {type, accessToken} = body;

  if (type === 'facebook') {
    const fbData = await socials.Facebook.findOne({subdomain}, 'pageId', {lean: true});
    const igData = await socials.Instagram.findOne({subdomain}, 'pageId', {lean: true});

    const fbPage = fbData?.pageId || null;
    const igPage = igData?.pageId || null;

    if (!fbPage && !igPage)
      return res.status(404).status({
        status: 'does not have accounts'
      });

    if (fbPage) {
      const fb = await Base.api(`/${fbPage}`, {
        access_token: accessToken,
        fields: 'access_token'
      });

      const longLive = await Base.exchangeToken(fb.access_token);
      
      await socials.Facebook.updateOne({subdomain}, {token: longLive});
    }
    if (igPage) {
      const ig = await Base.api(`/${igPage}`, {
        access_token: accessToken,
        fields: 'access_token'
      });

      const longLive = await Base.exchangeToken(ig.access_token);
      
      await socials.Instagram.updateOne({subdomain}, {token: longLive});
    }

    res.json({
      status: 'OK'
    });
  }
};
