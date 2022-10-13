import mongo  from '../mongoose';
import commentSchema from './schema';

const comments = mongo.models.BlogComments || mongo.model('BlogComments', commentSchema);

export default comments;
