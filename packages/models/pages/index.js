import mongo  from '../mongoose';
import pagesSchema from './schema';

const pages = mongo.models.BlogPages || mongo.model('BlogPages', pagesSchema);

export default pages;
