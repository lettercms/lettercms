import mongo  from '../mongoose';
import statSchema from './schema/stats';
import viewSchema from './schema/views';
import sessionSchema from './schema/sessions';

export const Stats = mongo.models.BlogStats || mongo.model('BlogStats', statSchema);

export const Views = mongo.models.BlogViews || mongo.model('BlogViews', viewSchema);

export const Sessions = mongo.models.BlogSessions || mongo.model('BlogSessions', sessionSchema);