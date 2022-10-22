import { withSentry } from '@sentry/nextjs';
import connect from '@lettercms/utils/lib/connection';
import * as socials from '@lettercms/models/socials';
import Base from '@lettercms/utils/lib/social/base';

async function createSocial(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      status: 'method-not-allowed'
    });

  await connect();

  const {type, accessToken, pageID, subdomain} = req.body;

  let account;

  if (type === 'instagram' || type === 'facebook') {
    const longLive = await exchangeToken(accessToken);

    if (type === 'facebook') {
      account = {
        subdomain,
        pageId: pageID,
        token: longLive
      };

      await socials.Facebook.create(account);
    }

    if (type === 'instagram') {
      const {instagram_business_account} = await api(`/${pageID}`, {
        access_token: longLive,
        fields: 'instagram_business_account'
      });

      const {id: userId} = await api(`/${instagram_business_account.id}`, {
        access_token: longLive
      });

      account = {
        userId,
        subdomain,
        pageId: pageID,
        token: longLive
      };

      await socials.Instagram.create(account);
    }

    res.json({
      status: 'OK',
      ...account
    });
  }
};

export default withSentry(createSocial);
