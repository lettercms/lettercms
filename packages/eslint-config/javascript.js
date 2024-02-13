const base = require('./base');

module.exports = {
  env: {
    'browser': true,
    'es6': true,
    'node': true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    "prettier"
  ],
  rules: {
    ...base.rules
  }
};
