import {Schema} from 'mongoose';

export default new Schema({
  pageId: {
    type: String,
    unique: true
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
  picture: String,
  cover: String
});
