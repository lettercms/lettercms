import {Schema}  from 'mongoose';

export default new Schema({
  subdomain: {
    type: String,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'BlogUsers'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'BlogPosts'
  },
  rating: {
    type: Number,
    default: 0,
    required: true
  },
  viewed: {
    type: Boolean,
    default: false,
    required: true
  }
});
