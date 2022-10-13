require('dotenv').config();

const connect = require('./utils/lib/connection');

module.exports = async function() {
  await connect();
}