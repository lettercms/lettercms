import { withSentry } from '@sentry/nextjs';
import connect from '@lettercms/utils/lib/connection';
import {Facebook, Instagram} from '@lettercms/models/socials';
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
    const longLiveToken = await Base.exchangeToken(accessToken);

    if (type === 'facebook') {
      account = {
        subdomain,
        pageId: pageID,
        token: longLiveToken
      };

      await Facebook.create(account);
    }

    if (type === 'instagram') {
      const {instagram_business_account} = await Base.api(`/${pageID}`, {
        access_token: longLiveToken,
        fields: 'instagram_business_account'
      });

      const {id: userId} = await Base.api(`/${instagram_business_account.id}`, {
        access_token: longLiveToken
      });

      account = {
        userId,
        subdomain,
        pageId: pageID,
        token: longLiveToken
      };

      await Instagram.create(account);
    }

    res.json({
      status: 'OK',
      ...account
    });
  }
};

export default withSentry(createSocial);
