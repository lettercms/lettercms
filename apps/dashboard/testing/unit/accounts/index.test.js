import {createMocks} from 'node-mocks-http';
import connect from '@lettercms/utils/lib/connection';
import indexAccounts from '../../../src/pages/api/_public/account/index';
import {Accounts} from '@lettercms/models/accounts';
import jwt from 'jsonwebtoken';

let id = null;
const testID = 'index-accounts';
const token = jwt.sign({subdomain: testID}, process.env.JWT_AUTH);
const password = 'hello-world-23';
const now = new Date();

const generatePromise = async (key, value) => {
  const {req, res} = createMocks({
    method: 'GET',
    url: `/account`,
    headers: {
      authorization: token
    },
    query: {
      fields: key
    }
  });

  await indexAccounts(req, res);

  expect(res._getStatusCode()).toBe(200);
  const {data, total, paging} = JSON.parse(res._getData());

  const dataMock = {
    _id: id
  }

  dataMock[key] = value;

  expect(data[0]).toEqual(dataMock);

  expect(data.length).toBe(1);

  expect(total).toEqual({
    all: 1,
    admin: 1,
    collaborator: 0,
    single: 0
  });

  expect(paging).toEqual({
    cursors: {}
  });

  return Promise.resolve();
}

beforeAll(async () => {
  await connect();

  const createAccountResponse = await Accounts.createAccount(testID, {
    name: 'David',
    lastname: 'Gonzalez',
    lastLogin: now,
    description: 'Test description',
    ocupation: 'developer',
    photo: 'photo-url',
    website: 'website-url',
    facebook: 'facebook-url',
    twitter: 'twitter-url',
    instagram: 'instagram-url',
    linkedin: 'linkedin-url',
    email: 'index-account@test.com',
    password,
    role: 'admin'
  });

  id = createAccountResponse.id.toString();
});

describe('Accounts API Testing - /account', () => {
  test('GET - Complete Data', async () => {
    const {req, res} = createMocks({
      method: 'GET',
      url: '/account',
      headers: {
        authorization: token
      }
    });

    await indexAccounts(req, res);

    const {data, paging, total} = JSON.parse(res._getData());

    expect(res._getStatusCode()).toBe(200);

    expect(data[0]).toMatchObject({
        name: 'David',
        lastname: 'Gonzalez',
        lastLogin: now.toISOString(),
        description: 'Test description',
        ocupation: 'developer',
        photo: 'photo-url',
        website: 'website-url',
        facebook: 'facebook-url',
        twitter: 'twitter-url',
        instagram: 'instagram-url',
        linkedin: 'linkedin-url',
        email: 'index-account@test.com',
        role: 'admin',
        firstTime: true,
        isSubscribeToNewsletter: false,
        subdomain: testID,
        _id: /[a-z0-9]{12,24}/,
        __v: 0
    });

    expect(data.length).toBe(1);

    expect(total).toEqual({
      all: 1,
      admin: 1,
      collaborator: 0,
      single: 0
    });

    expect(paging).toEqual({
      cursors: {}
    });
  });
  
  test('GET - Fields Data', async () => {
    const promises = [
      generatePromise('name',  'David'),
      generatePromise('lastname',  'Gonzalez'),
      generatePromise('lastLogin',  now.toISOString()),
      generatePromise('description',  'Test description'),
      generatePromise('ocupation',  'developer'),
      generatePromise('photo',  'photo-url'),
      generatePromise('website',  'website-url'),
      generatePromise('facebook',  'facebook-url'),
      generatePromise('twitter',  'twitter-url'),
      generatePromise('instagram',  'instagram-url'),
      generatePromise('linkedin',  'linkedin-url'),
      generatePromise('email',  'index-account@test.com'),
      generatePromise('role',  'admin')
    ];

    await Promise.all(promises);
  });

  afterAll(async () => {
    await Accounts.deleteMany({
      subdomain: testID
    });
  })
});
