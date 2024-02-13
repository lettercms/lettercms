const mongoose = require('mongoose');
const factory = require('@lettercms/models');
const {sign, verify} = require('@lettercms/utils/lib/crypto');
const jwt = require('jsonwebtoken');

const testMiddleware = require('../../testing/fetchMiddleware');

const generateToken = async (data, key) => {
  const secret = await sign(key);
  const hex = Buffer.from(JSON.stringify(data)).toString('hex');

  return `${secret}@${hex}`;
}

const {accounts: {Accounts}} = factory(['accounts']);
const testID = 'accounts-verify';

describe('Verify API Testing', () => {
  test('POST - Verify Data', async () => {

    const token = generateToken({
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: '1234',
      code: '1234'
    }, JWT_AUTH);

    const verifyRes = await testMiddleware('/api/account/verify', {
      method: 'POST',
      authorization: jwt.sign({subdomain: testID}, JWT_AUTH)
    });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body).toMatchObject({
      status: 'OK'
    });
    const acc = await Accounts.findOne({email: 'verify@test.com'}, null, {lean: true});

    expect(acc).toMatchObject({
      _id:/[a-z0-9]{12,24}/,
      __v: 0,
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: /\$2b\$10\$(\w|\.|\/){53}/i,
      subdomain: testID,
      firstTime: true,
      isSubscribeToNewsletter: false
    });
  });
  test('POST - Existing Data', async () => {
    const token = await generateToken({
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: '1234',
      code: '1234'
    }, JWT_AUTH);

    const verifyRes = await testMiddleware('/api/account/verify', {
      method: 'POST',
      authorization: jwt.sign({subdomain: testID}, JWT_AUTH),
      body: {
        token
      }
    });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body).toMatchObject({
        status: 'aready-exists',
        message: `Account with email "verify@test.com" already exists`
      });
  });
  test('POST - Verify Data', async () => {

    const token = await generateToken({
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: '1234',
      code: '1234'
    }, JWT_AUTH);

    const verifyRes = await testMiddleware('/api/account/verify', {
      method: 'POST',
      authorization: jwt.sign({subdomain: testID}, JWT_AUTH),
      body: {
        token
      }
    });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body).toMatchObject({
      status: 'OK'
    });
    const acc = await Accounts.findOne({email: 'verify@test.com'}, null, {lean: true});

    expect(acc).toMatchObject({
      _id:/[a-z0-9]{12,24}/,
      __v: 0,
      name: 'David',
      lastname: 'Gonzalez',
      email: 'verify@test.com',
      password: /\$2b\$10\$(\w|\.|\/){53}/i,
      subdomain: testID,
      firstTime: true,
      isSubscribeToNewsletter: false
    });
  });
  test('POST - Bad Request', async () => {

    const verifyRes = await testMiddleware('/api/account/verify', {
      method: 'POST',
      authorization: jwt.sign({subdomain: testID}, JWT_AUTH),
      body: {
        noToken: 'hola mundo'
      }
    });

    expect(verifyRes.status).toBe(400);
    expect(verifyRes.body).toMatchObject({
      status: 'bad-request',
      message: 'You must set a valid code'
    });
  });
  test('POST - Bad Request', async () => {

    const verifyRes = await testMiddleware('/api/account/verify', {
      method: 'POST',
      authorization: jwt.sign({subdomain: testID}, JWT_AUTH),
      body: JSON.stringify({
        token: 'hola@mundo'
      })
    });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body).toMatchObject({
      status: 'invalid-token'
    });
  });
  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });

    mongo.close();
  })
});
