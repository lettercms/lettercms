import {Schema}  from 'mongoose';

export default new Schema({
  subdomain:{
    type: String,
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'BlogPosts',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'BlogUsers',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  replyTo: {
    type: Schema.Types.ObjectId,
    ref: 'BlogComments'
  },
  published: {
    type: Date,
    required: true,
    default: Date.now()
  }
});
