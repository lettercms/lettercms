const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    //'**/davidsdevel-*/testing/me.test.js',
    //'**/davidsdevel-*/testing/login.test.js',
    //'**/davidsdevel-*/testing/exists.test.js',
    //'**/davidsdevel-*/testing/account.test.js'
    '**/testing/index.test.js'
  ],
  //setupFiles: ['./jest.setup.js']
};




module.exports = createJestConfig(customJestConfig)