import mongo  from '../mongoose';
import accountSchema from './schema/account';
import invitationSchema from './schema/invitation';
import codesSchema from './schema/codes';

export const Accounts = mongo.models.BlogAccount || mongo.model('BlogAccount', accountSchema);

export const Invitations = mongo.models.BlogInvitations || mongo.model('BlogInvitations', invitationSchema);

export const Codes = mongo.models.VerificationCodes || mongo.model('VerificationCodes', codesSchema);
