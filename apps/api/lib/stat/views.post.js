import * as socials from '@lettercms/models/socials';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import parser from 'ua-parser-js';
import countries from 'i18n-iso-countries';
import _url from 'url';

export default async function() {
  const {
    req: {
      geo,
      subdomain,
      body: {
        url,
        referrer
      },
      headers
    },
    res
  }  = this;
  
  const ua = headers['user-agent'];
  const {browser, os} = parser(ua);
  const country = headers['x-vercel-ip-country'];

  const countryName = look ? countries.getName(country, 'es') : 'Unknown';

  const {mainUrl} = await blogs.findOne({subdomain}, 'mainUrl', {lean: true});
  const existsPost = await posts.exists({url, subdomain});

  if (!existsPost && '/' + url !== mainUrl)
    return res.status(404).json({
      status: 'not-found'
    });

  if ('/' + url !== mainUrl)    
    await posts.updateOne({url, subdomain}, {$inc: {views: 1}});

  await stats.Stats.updateOne({subdomain}, {$inc: {totalViews: 1}});
  const viewData = {
    subdomain,
    country: countryName,
    os: os.name ||'Unknown',
    browser: browser.name ||'Unknown',
    url
  };
  if (referrer && referrer != 'undefined' && referrer != 'null')
    viewData.referrer = _url.parse(referrer).hostname;

  await stats.Views.create(viewData);

  res.json({
    status: 'OK'
  });
};
