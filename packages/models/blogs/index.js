import mongo  from '../mongoose';
import blogSchema from './schema';

const blogs = mongo.models.Blogs || mongo.model('Blogs', blogSchema);

export default blogs;
