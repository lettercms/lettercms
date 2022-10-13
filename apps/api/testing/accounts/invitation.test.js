const {manageMethods} = require('@lettercms/utils');
const POST = require('../lib/invitations.post');
const DELETE = require('../lib/invitations.delete');
const GET = require('../lib/invitations.get');

module.exports = manageMethods({
  POST,
  GET,
  DELETE
});
