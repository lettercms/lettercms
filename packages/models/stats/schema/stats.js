import {Schema}  from 'mongoose';

export default new Schema({
  subdomain: {
    type: String,
    required: true,
    unique: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  totalViews: {
    type: Number,
    default: 0
  },
  totalComments: {
    type: Number,
    default: 0
  },
  bounces:{
    default: 0,
    type: Number,
  },
  //comments: [Comments] //We look if we can use Facebook Comments
  subscriptors: {
    type: Number,
    default: 0
  }
});
