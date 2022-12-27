import connect from '@lettercms/utils/lib/connection';
import {Facebook} from '@lettercms/models/socials';


export default async function SetView(req, res) {
  await connect();

  const r = await Facebook.deleteMany({subdomain: 'davidsdevel'});

  res.json(r);
};


/*import * as socials from '@lettercms/models/socials';
import Base from '@lettercms/utils/lib/social/base';

export default async function PostAccount() {
  const accessToken = '';

  const longLive = await exchangeToken(accessToken);
  res.json({
    token
  });
};*/
