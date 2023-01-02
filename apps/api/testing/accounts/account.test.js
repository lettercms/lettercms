import next from 'next';
import supertest from 'supertest';
import express from 'express';
import setup from './setup';
import connect from '@lettercms/utils/lib/connection';
import {Accounts} from '@lettercms/models/accounts';

const app = next({ dev: true });
const server = setup(app, express());
const agent = supertest(server);

let id = null;

const testDate = new Date();
const testID = 'accounts-account';
const password = 'hello-world-23';
const token = jwt.sign({subdomain: testID}, process.env.JWT_AUTH);

const generatePromise = async (key, value, id) => {
  const {body, statusCode} = await testMiddleware('.//api/account/[emailHex]', {
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

beforeAll(async () => {
  const mongo = await connect();

  const hash = await bcrypt.hash(password, 10);
  
  const res = await Accounts.createAccount(testID, {
    subdomain: testID,
    name: 'David',
    lastname: 'Gonzalez',
    firstTime: false,
    description: 'Test description',
    lastLogin: testDate,
    ocupation: 'LetterCMS CEO',
    role: 'admin',
    isSubscribeToNewsletter: false,
    email:'account@test.com',
    password: hash,
    photo: 'photo-url',
    website: 'website-url',
    facebook: 'facebook-url',
    twitter: 'twitter-url',
    instagram: 'instagram-url',
    linkedin: 'linkedin-url',
    email: 'account@test.com',
  });

  id = res._id.toString();

  mongo.disconnect();
});

describe('Account API Testing', () => {
  test('GET - Complete Data', async () => {

    const matchObj = {
      name: 'David',
      lastname: 'Gonzalez',
      lastLogin: testDate.toISOString(),
      description: 'Test description',
      ocupation: 'LetterCMS CEO',
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

    const idRes = await testMiddleware('/api/account/[emailHex]', {
      authorization: token,
      query: {
        emailHex: id
      }
    });

    agent
      .get('/api/account')
      .expect(200, {
        message: 'Unauthorized'
      }, done);

    expect(idRes.statusCode).toBe(200);
    expect(idRes.body).toMatchObject(matchObj);

    const emailHex = Buffer.from('account@test.com').toString('hex');

    const emailRes = await testMiddleware('/api/account/[emailHex]', {
      authorization: token,
      query: {
        emailHex
      }
    });

    expect(emailRes.statusCode).toBe(200);
    expect(emailRes.body).toMatchObject(matchObj);
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
      email: 'account-fields@test.com',
      password: '1234',
      role: 'admin'
    });

    const promises = [
      generatePromise('name',  'David', id),
      generatePromise('lastname',  'Gonzalez', id),
      generatePromise('lastLogin',  now.toISOString(), id),
      generatePromise('description',  'Test description', id),
      generatePromise('ocupation',  'developer', id),
      generatePromise('permissions',  ['posts'], id),
      generatePromise('photo',  'photo-url', id),
      generatePromise('website',  'website-url', id),
      generatePromise('facebook',  'facebook-url', id),
      generatePromise('twitter',  'twitter-url', id),
      generatePromise('instagram',  'instagram-url', id),
      generatePromise('linkedin',  'linkedin-url', id),
      generatePromise('email',  'account-fields@test.com', id),
      generatePromise('role',  'admin', id)
    ];

    await Promise.all(promises);
  });
  test('GET - Not Found', async () => {

    const idRes = await testMiddleware(`/api/account/[emailHex]`, {
      authorization: token,
      query: {
        emailHex: 'some-id'
      }
    });

    expect(idRes.statusCode).toBe(404);
    expect(idRes.body).toMatchObject({
      status: 'not-found',
      message:'Account does not exists'
    });

  })
  test('PATCH - Data', async () => {
    const {id} = await Accounts.createAccount(testID, {
      name: 'David',
      lastname: 'Gonzalez',
      email: 'account-patch@test.com',
      password: '1234',
      role: 'admin'
    });

    const header = {
      method: 'PATCH',
      authorization: token,
      query: {
        emailHex: id
      }
    }

    const addData = await testMiddleware('/api/account/[emailHex]', {
      ...header,
      body: {
        ocupation: 'developer',
      }
    });

    expect(addData.statusCode).toBe(200);
    expect(addData.body).toMatchObject({
      status: 'OK'
    });
    
    const add = await Accounts.findOne({_id: id}, null, {lean: true});
    expect(add).toMatchObject({
      name: 'David',
      lastname: 'Gonzalez',
      firstTime: true,
      isSubscribeToNewsletter: false,
      email: 'account-patch@test.com',
      ocupation: 'developer',
      password: /\$2b\$10\$(\w|\.|\/){53}/i,
      role: 'admin',
      __v: 0,
      _id: /[a-z0-9]{12,24}/i,
      subdomain: "accounts-account",
      permissions:[
        "posts",
        "pages",
        "stats",
        "social",
        "email",
        "config",
        "accounts"
      ]
    });

    const patchData = await testMiddleware('/api/account/[emailHex]', {
      ...header,
      body: {
        name: 'Juan'
      }
    });

    expect(patchData.statusCode).toBe(200);
    expect(patchData.body).toMatchObject({
      status: 'OK'
    });

    const patch = await Accounts.findOne({_id: id}, null, {lean: true});
    expect(patch).toMatchObject({
      lastname: 'Gonzalez',
      name: 'Juan',
      firstTime: true,
      isSubscribeToNewsletter: false,
      email: 'account-patch@test.com',
      ocupation: 'developer',
      password: /\$2b\$10\$(\w|\.|\/){53}/,
      role: 'admin',
      __v: 0,
      _id: /[a-z0-9]{12,24}/,
      subdomain: "accounts-account",
      permissions:[
        "posts",
        "pages",
        "stats",
        "social",
        "email",
        "config",
        "accounts"
      ]
    });
  })

  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });
  })
});
