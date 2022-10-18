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

function increment(key, value) {
  if (!value)
    return;

  this[key] = this[key] ? this[key] + value : value;
}

const days = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado'
];

const hours = {
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
};

const initialDaysCounts = {
  Domingo: 0,
  Lunes: 0,
  Martes: 0,
  Miercoles: 0,
  Jueves: 0,
  Viernes: 0,
  Sabado: 0
};

const generateHour = date => {
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
};

const generateDates = (daysCount, dateEnd) => {
  const dates = {};

  for (let i = Math.floor(daysCount); i >= 0; i -= 1) {
      const time = new Date(dateEnd - ((i - 1)* 1000 * 60 * 60 * 24));
      const month = time.getMonth() + 1;
      const date = time.getDate();

      const path = `${date < 10 ? `0${date}` : date}-${month < 10 ? `0${month}` : month}`;
      
      dates[path] = 0;
    }

    return dates;
};

const generateRanges = (start, end) => {
  const dateEnd = new Date(end || Date.now());
  const dateStart = new Date(start || dateEnd - (1000 * 60 * 60 * 24 * 30));
 
  return {
    dateEnd,
    dateStart,
    diff: (dateEnd - dateStart) / (1000 * 60 * 60 * 24)
  };
};

export default async function() {
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

  if (start === 'historic') {
    const {creationDate} = await Stats.findOne({subdomain}, 'creationDate', {lean: true});
    start = creationDate;
  }

  const {dateEnd, dateStart, diff} = generateRanges(start, end);

  if (diff < 0)
    return res.json({
      code: 'invalid-date',
      message: 'End date must be greather than start date'
    });

  let data;
  let general;
  let views;
  let comments;
  let subscriptors;

  if (hasDataViews)
    data.views = {};
  if (hasGeneral && query.fields?.includes('general.')) {
    const generalSelect = query.fields.split(',').filter(e => e.startsWith('general.')).map(e => e.split('.')[1]).join(' ');
    
    general = await stats.Stats.findOne({subdomain}, generalSelect, {lean: true});

    if (fields['general.bounceRate'])
      general.bounceRate = (general.bounces / general.totalViews * 100).toFixed(1);
  }

  conditions.date = {
    $gt: dateStart,
    $lt: +dateEnd + (1000 * 60 * 60 * 24)
  };

  if (hasViews || hasDataViews) {
    const viewData = await stats.Views.find(conditions, null, {lean: true});

    if (hasViews)
      views = viewData.map(e => e.total).reduce((a, b) => a + b);

    if (hasDataViews)
      data = viewData;
  }
  
  if (hasComments)
    comments = await commentsModel.countDocuments({published: conditions.time, subdomain});
  
  if (hasSubscriptors)
    subscriptors = await Users.countDocuments({subscriptionTime: conditions.time, subdomain});

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
