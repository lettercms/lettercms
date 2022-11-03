module.exports = {
  testEnvironment: 'node',
  testTimeout: 10000,
  testMatch: [
    //'**/davidsdevel-*/testing/me.test.js',
    //'**/davidsdevel-*/testing/login.test.js',
    //'**/davidsdevel-*/testing/exists.test.js',
    //'**/davidsdevel-*/testing/account.test.js'
    '**/testing/index.test.js'
  ],
  //setupFiles: ['./jest.setup.js']
};
