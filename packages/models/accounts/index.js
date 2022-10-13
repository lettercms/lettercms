import mongo  from '../mongoose';
import accountSchema from './schema/account';
import invitationSchema from './schema/invitation';

export const Accounts = mongo.models.BlogAccount || mongo.model('BlogAccount', accountSchema);

export const Invitations = mongo.models.BlogInvitations || mongo.model('BlogInvitations', invitationSchema);