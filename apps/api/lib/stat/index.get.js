import posts from '@lettercms/models/posts';
import commentsModel from '@lettercms/models/comments';
import {Users} from '@lettercms/models/users';
import * as stats from '@lettercms/models/stats';

const parseFields = fields => {
  if (!fields)
    return {
      all: true
    };

  const fieldsObj = {};

  fields.split(',').forEach(e => {
    fieldsObj[e] = true;
  });

  return fieldsObj;
};

const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

const generateDates = (daysCount, dateEnd) => {
  const dates = [];

  for (let i = Math.floor(daysCount); i >= 0; i -= 1) {
      const time = new Date(dateEnd - ((i - 1)* 1000 * 60 * 60 * 24));

      const month = time.getMonth() + 1;
      const date = time.getDate();

      const path = `${time.getFullYear()}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`;
      
      dates.push(path);
    }

    return dates;
};

const generateRanges = (start, end) => {
  const dateEnd = new Date(end || Date.now());

  let parsedStart = +start;

  if (isNaN(parsedStart))
    parsedStart = start;

  const dateStart = parsedStart  ? parsedStart : dateEnd - (1000 * 60 * 60 * 24 * 30);

  return {
    dateEnd,
    dateStart: new Date(dateStart),
    diff: (dateEnd - dateStart) / (1000 * 60 * 60 * 24)
  };
};

export default async function GetStats() {
  const {
    req: {
      query,
      subdomain
    },
    res
  }  = this;

  const {
    url,
    os,
    browser,
    country,
    end
  } = query;

  let {
    start
  } = query;


  const fields = parseFields(query.fields);

  const conditions = {
    subdomain
  };

  const existsStats = await stats.Stats.exists({subdomain});

  if (!existsStats)
    return res.status(404).json({
      status: 'no-stats',
      message: 'Stats does not exists'
    });

  const hasData =           fields.all || fields.data || query.fields?.includes('data.');
  const hasDataViews =      fields.all || fields.data || fields['data.views'];
  const hasGeneral =        fields.all || fields.general || query.fields?.includes('general.');
  const hasMostCommented =  fields.all || fields.general || fields['general.mostCommented'];
  const hasMostViewed =     fields.all || fields.general || fields['general.mostViewed'];
  const hasViews =          fields.all || fields.views;
  const hasComments =       fields.all || fields.comments;
  const hasSubscriptors =   fields.all || fields.subscriptors;

  if (start === 'historic')
    start = (await stats.Stats.findOne({subdomain}, 'creationDate', {lean: true})).creationDate;

  const {dateEnd, dateStart, diff} = generateRanges(start, end);

  if (diff < 0)
    return res.json({
      code: 'invalid-date',
      message: 'End date must be greather than start date'
    });

  let data = {};
  let general;
  let views;
  let comments;
  let subscriptors;

  if (hasDataViews)
    data = {};

  if (hasGeneral) {
    const generalSelect = query.fields?.split(',').filter(e => e.startsWith('general.')).map(e => e.split('.')[1]).join(' ');
    
    general = await stats.Stats.findOne({subdomain}, generalSelect, {lean: true});

    if (fields['general.bounceRate'])
      general.bounceRate = (general.bounces / general.totalViews * 100).toFixed(1);
  }

  conditions.date = {
    $gt: +dateStart,
    $lt: +dateEnd
  };

  if (hasViews || hasDataViews) {
    const viewData = await stats.Views.find(conditions);

    if (hasViews) {

      views = viewData.length === 0 ? 0 : viewData.map(e => e.total).reduce((a, b) => a + b);
    }

    if (hasDataViews) {
      data = {
        countries: {},
        oss: {},
        browsers: {},
        urls: {},
        hours: {},
        days: {},
        dates: {},
        referrers: {}
      };

      const defaultDates = generateDates(diff, dateEnd -  (1000 * 60 * 60 * 24));

      const dataKeys = viewData.map(e => e.viewKey);

      if (dataKeys.length === 0) {
        data = {
          ...data,
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
      }

      defaultDates.forEach(e => {
        const viewIndex = dataKeys.indexOf(e);
        const view = viewData[viewIndex];

        if (!view) {
          data.dates[e] = 0;
          return;
        }

        data.dates[e] = view.total;

        view.countries?.forEach((val, key) => {
          const value = data.countries[key];

          if (value)
            data.countries[key] = value + val;
          else
            data.countries[key] = val;
        });

        view.oss?.forEach((val, key) => {
          const value = data.oss[key];

          if (value)
            data.oss[key] = value + val;
          else
            data.oss[key] = val;
        });

        view.browsers?.forEach((val, key) => {
          const value = data.browsers[key];

          if (value)
            data.browsers[key] = value + val;
          else
            data.browsers[key] = val;
        });

        view.urls?.forEach((val, key) => {
          const value = data.urls[key];

          if (value)
            data.urls[key] = value + val;
          else
            data.urls[key] = val;
        });

        view.hours.forEach((val, key) => {
          const value = data.hours[key];

          if (value)
            data.hours[key] = value + val;
          else
            data.hours[key] = val;
        });

        view.days.forEach((val, key) => {
          const value = data.days[key];

          if (value)
            data.days[key] = value + val;
          else
            data.days[key] = val;
        });

        view.referrers?.forEach((val, key) => {
          const _key = key.replace(/\:/g, '.');

          const value = data.referrers[_key];

          if (value)
            data.referrers[_key] = value + val;
          else
            data.referrers[_key] = val;
        });
      });
    }
  }
  
  if (hasComments)
    comments = await commentsModel.countDocuments({published: conditions.time, subdomain});
  
  if (hasSubscriptors)
    subscriptors = await Users.countDocuments({subscriptionTime: conditions.time, subdomain, active: true /*Change to subscription status*/});

  if (hasMostViewed)
    general.mostViewed = await posts.findOne({subdomain}, 'thumbnail title views comments url', {
      sort: {
        views: -1
      },
      lean: true
    });

  if (hasMostCommented)
    general.mostCommented = await posts.findOne({subdomain}, 'thumbnail title views comments url', {
      sort: {
        comments: -1
      },
      lean: true
    });

  res.json({
    general,
    data,
    views,
    comments,
    subscriptors
  });
};
