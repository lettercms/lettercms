import mongo  from '../mongoose';
import facebookSchema from './schema/facebook';
import instagramSchema from './schema/instagram';

export const Facebook = mongo.models.FacebookAccounts || mongo.model('FacebookAccounts', facebookSchema);

export const Instagram = mongo.models.InstagramAccounts || mongo.model('InstagramAccounts', instagramSchema);