const fetch = require('node-fetch');
const mongoose = require('mongoose');
const factory = require('@lettercms/models');

const testMiddleware = require('../../testing/fetchMiddleware');

const {accounts: {Accounts}} = factory(['accounts']);
const testID = 'exists-account';

describe('Accounts API Testing', () => {
  test('GET - Exists Account', async () => {
    const now = new Date();

    await Accounts.createAccount(testID, {
      name: 'David',
      lastname: 'Gonzalez',
      lastLogin: now,
      email: 'exists-account@test.com',
      password: '1234',
      role: 'admin'
    });

    const nameResponse = await fetchMiddleware('/api/account/exists', {
      query: {
        name: 'David'
      }
    })
    expect(nameResponse.statusCode).toBe(200);


    const lastnameResponse = await fetchMiddleware('/api/account/exists', {
      query: {
        lastname: 'Gonzalez'
      }
    })
    expect(lastnameResponse.statusCode).toBe(200);

    const emailResponse = await fetchMiddleware('/api/account/exists', {
      query: {
        email: 'exists-account@test.com'
      }
    });
    expect(emailResponse.statusCode).toBe(200);


    const subRes = await fetchMiddleware('/api/account/exists', {
      query: {
        subdomain: testID
      }
    });
    expect(subRes.statusCode).toBe(200);

  });

  test('GET - Not Found', async () => {
    const emailResponse = await fetchMiddleware('/api/account/exists', {
      query: {
        email: 'does-not-exists@test.com'
      }
    });
    expect(emailResponse.statusCode).toBe(404);
  });

  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });

    mongo.close();
  });
});