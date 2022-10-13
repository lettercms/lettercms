import mongo  from '../mongoose';
import userSchema from './schema/users';
import ratingSchema from './schema/ratings';

export const Users = mongo.models.BlogUsers || mongo.model('BlogUsers', userSchema);

export const Ratings = mongo.models.BlogRatings || mongo.model('BlogRatings', ratingSchema);