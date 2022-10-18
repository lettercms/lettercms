import {Schema}  from 'mongoose';

export default new Schema({
  subdomain:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  urls: Map,
  oss: Map,
  browsers: Map,
  countries: Map,
  referrers: Map,
  hours: Map,
  days: Map
});
