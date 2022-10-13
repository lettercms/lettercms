import {Schema} from 'mongoose';

export default new Schema({
  userId: {
    type: String,
    unique: true
  },
  pageId: {
    type: String,
    required: true
  },
  subdomain: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    unique: true
  },
  name: String,
  username: String,
  picture: String
});
