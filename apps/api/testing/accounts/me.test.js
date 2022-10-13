const fetch = require('node-fetch');
const mongoose = require('mongoose');
const factory = require('@lettercms/models');
const jwt = require('jsonwebtoken');

const testMiddleware = require('../../testing/fetchMiddleware');

const {accounts: {Accounts}} = factory(['accounts']);
const testID = 'accounts-me';

const generatePromise = async (key, value, token) => {
  const r = await testMiddleware('/api/account/me', {
    authorization: token,
    query: {
      fields: key
    }
  })

  expect(r.statusCode).toBe(200);
  expect(r.body).toMatchObject({
    [key]: value,
    _id: /[a-z0-9]{12,24}/i
  });

  return Promise.resolve();
}

describe('Me API Testing', () => {
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
      email: 'login-me@test.com',
      password: '1234',
      role: 'admin'
    });

    const _me = await testMiddleware('/api/account/me', {
      authorization: jwt.sign({subdomain: testID, account: id}, JWT_AUTH),
    });

    expect(_me.statusCode).toBe(200);
    expect(_me.body).toMatchObject({
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
      email: 'login-me@test.com',
      role: 'admin',
      _id: /[a-z0-9]{12,24}/,
      __v: 0
    });
  });
  test('GET - Fields Data', async () => {
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
      email: 'me-fields@test.com',
      password: '1234',
      role: 'admin'
    });

    const token = jwt.sign({subdomain: testID, account: id}, JWT_AUTH);

    const promises = [
      generatePromise('name',  'David', token),
      generatePromise('lastname',  'Gonzalez', token),
      generatePromise('lastLogin',  now.toISOString(), token),
      generatePromise('description',  'Test description', token),
      generatePromise('ocupation',  'developer', token),
      generatePromise('permissions',  ['posts'], token),
      generatePromise('photo',  'photo-url', token),
      generatePromise('website',  'website-url', token),
      generatePromise('facebook',  'facebook-url', token),
      generatePromise('twitter',  'twitter-url', token),
      generatePromise('instagram',  'instagram-url', token),
      generatePromise('linkedin',  'linkedin-url', token),
      generatePromise('email',  'me-fields@test.com', token),
      generatePromise('role',  'admin', token)
    ];

    await Promise.all(promises);
  });

  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });

    mongo.close();
  })
});
