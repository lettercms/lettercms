import {Schema}  from 'mongoose';

export default new Schema({
  subdomain:{
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  referrer: String,
  os: String,
  browser: String,
  country: String,
  time:{
    type: Date,
    default: Date.now,
    required: true
  }
});
