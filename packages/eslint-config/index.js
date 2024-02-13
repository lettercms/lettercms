const base = require('./base');

module.exports = {
  extends: ["next", "turbo", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    ...base.rules,
    "@next/next/no-img-element": "off",
    "turbo/no-undeclared-env-vars": "off"
  }
};
