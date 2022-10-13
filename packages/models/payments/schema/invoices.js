import {Schema} from 'mongoose';

const Fields = new Schema({
  label: {
    type: String,
    required: true
  },
  used: {
    type: Number,
    required: true
  },
  costPerUnit: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

export default new Schema({
  subdomain: {
    type: String,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  fields: [Fields]
});
