import * as socials from '@lettercms/models/socials';
import posts from '@lettercms/models/posts';
import blogs from '@lettercms/models/blogs';
import parser from 'ua-parser-js';
import countries from 'i18n-iso-countries';
import _url from 'url';

const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

function generateHour(date) {
  let hour = date.getHours();

  if (hour < 12)
    hour = `${hour}AM`;
  else if (hour === 12)
    hour = `${hour}M`;
  else if (hour > 12)
    hour = `${hour - 12}PM`;
  else if (hour === 0)
    hour = '12AM';

  return hour;
}

function generateKey() {
  const date = new Date();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const year = time.getFullYear();

  return `${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
}

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
  const osName = os.name ||'Unknown';
  const browserName = browser.name ||'Unknown';
  const referrerName = referrer && referrer != 'undefined' && referrer != 'null' ? _url.parse(referrer).hostname : null;

  const {mainUrl} = await blogs.findOne({subdomain}, 'mainUrl', {lean: true});
  const existsPost = await posts.exists({url, subdomain});

  if (!existsPost && '/' + url !== mainUrl)
    return res.status(404).json({
      status: 'not-found'
    });

  if ('/' + url !== mainUrl)    
    await posts.updateOne({url, subdomain}, {$inc: {views: 1}});

  const key = generateKey();

  const view = await stats.views.findOne({key, subdomain});

  const now = new Date();
  const hour = generateHour(now);
  const day = time.getDay();

  if (!view) {
    //set default data
    const newData = {
      subdomain,
      key,
      total: 1,
      date: new Date(key),
      hours: {
        '1AM': 0,
        '2AM': 0,
        '3AM': 0,
        '4AM': 0,
        '5AM': 0,
        '6AM': 0,
        '7AM': 0,
        '8AM': 0,
        '9AM': 0,
        '10AM': 0,
        '11AM': 0,
        '12M': 0,
        '1PM': 0,
        '2PM': 0,
        '3PM': 0,
        '4PM': 0,
        '5PM': 0,
        '6PM': 0,
        '7PM': 0,
        '8PM': 0,
        '9PM': 0,
        '10PM': 0,
        '11PM': 0,
        '12AM': 0,
      },
      days: {
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0
      }
    };

    newData.countries[countryName] = 1;
    newData.oss[osName] = 1;
    newData.browsers[browserName] = 1;
    newData.urls[url] = 1;

    newData.hours[hours] = 1;
    newData.days[days[day]] = 1

    if (referrerName)
      newData.referrers[referrerName] = 1;

    await stats.views.create(newData);
  } else {
    const {countries, oss, browsers, urls, referrers, hours, days: _days} = view;

    //Get new values from actual data
    const newCountriesValue = (countries.get(countryName) || 0) + 1;
    const newBrowsersValue = (browsers.get(browserName) || 0) + 1;
    const newOssValue = (oss.get(osName) || 0) + 1;
    const newUrlsValue = (urls.get(url) || 0) + 1;

    const newHourValue = (hours.get(hour) || 0) + 1;
    const newDayValue = (_days.get(day) || 0) + 1;

    //Updated views
    countries.set(countryName, newCountriesValue);
    browsers.set(browserName, newBrowsersValue);
    oss.set(osName, newOssValue);
    urls.set(url, newUrlsValue);
    hours.set(hour, newHourValue);
    _days.set(day, newDayValue);

    if (referrerName) {
      const newRefValue = (referrers.get(referrerName) || 0) + 1;

      referrers.set(referrerName, newRefValue);
    }

    await stats.Views.updateOne({key, subdomain}, {urls, referrers, countries, oss, browsers, $inc: {total: 1}});
  }

  await stats.Stats.updateOne({subdomain}, {$inc: {totalViews: 1}});

  res.json({
    status: 'OK'
  });
};
