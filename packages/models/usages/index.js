import mongo  from '../mongoose';
import usageSchema from './schema';

export default mongo.models.BlogUsage || mongo.model('BlogUsage', usageSchema);

