const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  rootDir: '.',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'node',
  testTimeout: 20000,
  testMatch: [
    //'**/davidsdevel-*/testing/me.test.js',
    //'**/davidsdevel-*/testing/login.test.js',
    //'**/davidsdevel-*/testing/exists.test.js',


    //'**/testing/unit/accounts/invitation.test.js',

    '**/testing/unit/accounts/index.test.js',
    '**/testing/unit/accounts/collaborator.test.js',
    '**/testing/unit/accounts/exists.test.js',
    '**/testing/unit/accounts/account.test.js',
    '**/testing/unit/index.test.js'
  ]
};




module.exports = createJestConfig(customJestConfig)