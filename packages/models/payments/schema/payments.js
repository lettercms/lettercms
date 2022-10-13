import {Schema} from 'mongoose';

export default new Schema({
  subdomain: {
    required: true,
    type: String,
    unique: true
  },
  balance: {
    type: Number,
    required:true,
    default: 0
  },
  lastPayment: Date,
  nextPayment: {
    type: Date,
    required: true
  },
  isPreBuy: Boolean
});
