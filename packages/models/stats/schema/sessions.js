import {Schema}  from 'mongoose';

export default new Schema({
  subdomain: {
    type: String,
    required: true,
  },
  routes: {
    type: Array,
    required: true
  },
  sessionTime: {
    type: Number,
    required: true
  },
  socialReferral: {
    type: String
  },
  device: {
    type: String,
    required: true,
    enum: ['mobile', 'desktop']
  },
  entryChannel: {
    type: String,
    required: true,
    enum: [
      'organic',
      'direct',
      'referral',
      'emai',
      'social',
      'other'
    ]
  }
});
