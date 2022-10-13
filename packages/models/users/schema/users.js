import {Schema}  from 'mongoose';

const user = new Schema({
  subdomain: {
    type: String,
    required: true
  },
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
    index: true,
    sparse: true
  },
  messagingToken: String,
  verified: {
    type: Boolean,
    default: false,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  device: {
    type: String,
    required: true,
    enum: ['mobile', 'desktop']
  },
  mlModel: String,
  hasRecommendations: {
    type: Boolean,
    default: false,
    required: true
  },
  views: [{
    type: Map,
    of: String,
  }],
  postsView: {
    type: Number,
    required: true,
    default: 0
  },
  subscriptionTime: Date,
  /*,
  isBlocked: {
    type: Boolean,
    default: false,
    required: true
  }*/
});

user.index({mlModel: 'text'});

export default user;
