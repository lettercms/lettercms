import {Schema}  from 'mongoose';

export default new Schema({
  jobId: {
    type: String,
    required: true,
    unique: true
  },
  scheduleId: {
    type: String,
    required: true,
    unique: true
  }
});
