import {Schema} from 'mongoose';

const Codes = new Schema({
  code: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    default:() => (Date.now() + (5 * 60 * 1000)),
    required: true
  }
});

export default Codes;
