import {Schema} from 'mongoose';

const ApiKey = new Schema({
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
});

const blog = new Schema({
  subdomain:{
    type: String,
    unique: true,
    required: true
  },
  customDomain: String,
  isVisible: {
    type: Boolean,
    default: false,
    required: true
  },
  hasCustomRobots: {
    type: Boolean,
    default: false,
    required: true
  },
  robots: String,
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'BlogAccount'
  },
  url: {
    type: String,
    default: '1',
    required: true
  },
  categories: {
    type: Map,
    default: new Map()
  },
  tags: {
    type: Map,
    default: new Map()
  },
  mainUrl: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: 'https://cdn.jsdelivr.net/gh/lettercms/lettercms/apps/cdn/images/og-template.png'
  },
  keys: [ApiKey]
});

blog.virtual('domain').get(function() {
  let domain = 'https://';

  if (this.customDomain)
    domain += this.customDomain;
  else
    domain += `${this.subdomain}.lettercms.vercel.app`;

  return domain;
});

export default blog;
