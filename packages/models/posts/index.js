import mongo  from '../mongoose';
import postSchema from './schema';

const posts = mongo.models.BlogPosts || mongo.model('BlogPosts', postSchema);

export default posts;
