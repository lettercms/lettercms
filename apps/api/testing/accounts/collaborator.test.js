const factory = require('@lettercms/models');
const jwt = require('jsonwebtoken');
const testMiddleware = require('../../testing/fetchMiddleware');

const {accounts: {Accounts}} = factory(['accounts']);

const testID = 'accounts-account';
const token = jwt.sign({subdomain: testID}, process.env.JWT_AUTH);

const generatePromise = async (key, value, id) => {
  const {body, statusCode} = await testMiddleware('accounts/lib/emailHex.get', {
    authorization: token,
    query: {
      fields: key,
      emailHex: id
    }
  });

  expect(statusCode).toBe(200);
  expect(body).toMatchObject({
    [key]: value,
    _id: /[a-z0-9]{12,24}/i
  });

  return Promise.resolve();
}

describe('Account API Testing', () => {
  test('GET - Complete Data', async () => {
    const now = new Date();
    const {id} = await Accounts.createAccount(testID, {
      name: 'David',
      lastname: 'Gonzalez',
      lastLogin: now,
      description: 'Test description',
      ocupation: 'developer',
      permissions: ['posts'],
      photo: 'photo-url',
      website: 'website-url',
      facebook: 'facebook-url',
      twitter: 'twitter-url',
      instagram: 'instagram-url',
      linkedin: 'linkedin-url',
      email: 'account@test.com',
      password: '1234',
      role: 'admin'
    });

    const matchObj = {
      name: 'David',
      lastname: 'Gonzalez',
      lastLogin: now.toISOString(),
      description: 'Test description',
      ocupation: 'developer',
      permissions: ['posts'],
      photo: 'photo-url',
      website: 'website-url',
      facebook: 'facebook-url',
      twitter: 'twitter-url',
      instagram: 'instagram-url',
      linkedin: 'linkedin-url',
      email: 'account@test.com',
      role: 'admin',
      _id: /[a-z0-9]{12,24}/,
      __v: 0
    }

    const idRes = await testMiddleware('accounts/lib/emailHex.get', {
      authorization: token,
      query: {
        emailHex: id
      }
    });

    expect(idRes.statusCode).toBe(200);
    expect(idRes.body).toMatchObject(matchObj);

    const emailHex = Buffer.from('account@test.com').toString('hex');

    const emailRes = await testMiddleware('accounts/lib/emailHex.get', {
      authorization: token,
      query: {
        emailHex
      }
    });

    expect(emailRes.statusCode).toBe(200);
    expect(emailRes.body).toMatchObject(matchObj);
  });
  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });
  })
});
