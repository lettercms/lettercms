const {manageMethods} = require('@lettercms/utils');
const GET = require('../lib/index.get');
const POST = require('../lib/index.post');

module.exports = manageMethods({
  GET,
  POST
});
