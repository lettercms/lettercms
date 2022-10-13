import {Schema}  from 'mongoose';

export default new Schema({
  subdomain: {
    type: String,
    required: true,
    unique: true
  },
  postsVersions: {
    type: Number,
    required: true,
    default: 0
  },
  pages: {
    type: Number,
    required: true,
    default: 0
  },
  abTest: {
    type: Number,
    required: true,
    default: 0
  },
  statsReports: {
    type: Number,
    required: true,
    default: 0
  },
  statsRealtimeEnabled: {
    type: Boolean,
    required: true,
    default: false
  },
  socialSchedule: {
    type: Number,
    required: true,
    default: 0
  },
  socialAccounts: {
    type: Number,
    required: true,
    default: 0
  },
  emailsCampaign:{
    type: Number,
    required: true,
    default: 0
  },
  accountsCollabs: {
    type: Number,
    required: true,
    default: 0
  },
  accountsSingle: {
    type: Number,
    required: true,
    default: 0
  },
  filesStorage: {
    type: Number,
    required: true,
    default: 0
  },
  filesUpload: {
    type: Number,
    required: true,
    default: 0
  }
});
