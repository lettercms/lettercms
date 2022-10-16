import mongo  from '../mongoose';
import schema from './schema';

const jobs = mongo.models.BlogJobs || mongo.model('BlogJobs', schema);

export default jobs;
