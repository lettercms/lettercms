const fetch = require('node-fetch');
const mongoose = require('mongoose');
const factory = require('@lettercms/models');

const testMiddleware = require('../../testing/fetchMiddleware');

const {accounts: {Accounts}} = factory(['accounts']);
const testID = 'accounts-login';

const baseRequest = {
  authorization: ACCESS_TOKEN,
}

describe('Login API Testing', () => {
  test('POST - Login Sucessfully', async () => {
    await Accounts.createAccount(testID, {
      email: 'login@test.com',
      password: '1234',
      role: 'admin'
    });

    const loginRes = await testMiddleware('/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: {
        email: 'login@test.com',
        password: '1234'
      }
    });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toMatchObject({
      id: /[a-z0-9]{24}/i,
      accessToken: /\w*\.\w*\.\w*/i
    });
  });

  test('POST - Invalid Email', async () => {
    const loginRes = await testMiddleware('/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: {
        email: 'no-email@test.com',
        password: '1234'
      }
    });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toEqual({
      status: 'no-account',
      message: 'Email does not exists'
    });
  });

  test('POST - Invalid Password', async () => {
    await Accounts.createAccount(testID, {
      email: 'bad-pass@test.com',
      password: '1234',
      role: 'admin'
    });

    const loginRes = await testMiddleware('/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: {
        email: 'bad-pass@test.com',
        password: 'bad-pass'
      }
    });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toEqual({
      status: 'invalid-password',
      message: 'Invalid Password'
    });
  });
  test('POST - No Email', async () => {
    const loginRes = await testMiddleware('/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: {
        password: '1234'
      }
    });

    expect(loginRes.statusCode).toBe(400);
    expect(loginRes.body).toEqual({
      status: 'bad-request',
      message: 'Email must be set'
    });
  });
  test('POST - No Password', async () => {
    const loginRes = await testMiddleware('/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: {
        email: 'login@test.com'
      }
    });

    expect(loginRes.statusCode).toBe(400);
    expect(loginRes.body).toEqual({
      status: 'bad-request',
      message: 'Password must be set'
    });
  });
  test('POST - No Data', async () => {
    const loginRes = await testMiddleware('/api/account/login', {
      ...baseRequest,
      method: 'POST',
      body: {}
    });

    expect(loginRes.statusCode).toBe(400);
    expect(loginRes.body).toEqual({
      status: 'bad-request',
      message: 'Email must be set'
    });
  });

  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });

    mongo.close();
  })
});
