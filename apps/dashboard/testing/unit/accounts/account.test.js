import {createMocks} from 'node-mocks-http';
import connect from '@lettercms/utils/lib/connection';
import singleAccount from '../../../src/pages/api/_public/account/[emailHex]';
import {Accounts} from '@lettercms/models/accounts';
import jwt from 'jsonwebtoken';

let id = null;

const testDate = new Date();
const testID = 'accounts-account';
const password = 'hello-world-23';
const token = jwt.sign({subdomain: testID}, process.env.JWT_AUTH);

const generatePromise = async (key, value, id) => {
  const {req, res} = createMocks({
    method: 'GET',
    url: `/account/${id}`,
    headers: {
      authorization: token
    },
    query: {
      emailHex: id,
      fields: key
    }
  });

  await singleAccount(req, res);

  const dataMock = {
    _id: id
  }

  dataMock[key] = value;

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData())).toEqual(dataMock);

  return Promise.resolve();
}

beforeAll(async () => {
  await connect();

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
    password,
    photo: 'photo-url',
    website: 'website-url',
    facebook: 'facebook-url',
    twitter: 'twitter-url',
    instagram: 'instagram-url',
    linkedin: 'linkedin-url'
  });

  id = res.id.toString();
});

describe('Account API Testing - /account/[emailHex]', () => {
  test('GET - Complete Data', async () => {
    const {req, res} = createMocks({
      method: 'GET',
      url: `/account/${id}`,
      headers: {
        authorization: token
      },
      query: {
        emailHex: id
      }
    });

    await singleAccount(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
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
      firstTime: false,
      isSubscribeToNewsletter: false,
      subdomain: testID,
      role: 'admin',
      _id: id,
      __v: 0
    });
  });

  test('GET - Fields Data', async () => {
    const promises = [
      generatePromise('name',  'David', id),
      generatePromise('lastname',  'Gonzalez', id),
      generatePromise('lastLogin',  testDate.toISOString(), id),
      generatePromise('description',  'Test description', id),
      generatePromise('ocupation',  'LetterCMS CEO', id),
      generatePromise('photo',  'photo-url', id),
      generatePromise('website',  'website-url', id),
      generatePromise('facebook',  'facebook-url', id),
      generatePromise('twitter',  'twitter-url', id),
      generatePromise('instagram',  'instagram-url', id),
      generatePromise('linkedin',  'linkedin-url', id),
      generatePromise('email',  'account@test.com', id),
      generatePromise('role',  'admin', id)
    ];

    await Promise.all(promises);
  });

  test('GET - Not Found', async () => {
    const {req, res} = createMocks({
      method: 'GET',
      url: '/account/some-id',
      headers: {
        authorization: token
      },
      query: {
        emailHex: 'some-id'
      }
    });

    await singleAccount(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({
      status: 'not-found',
      message:'Account does not exists'
    });
  });

  test('PATCH - Data', async () => {
    const accountRes = await Accounts.createAccount(testID, {
      name: 'David',
      lastname: 'Gonzalez',
      email: 'account-patch@test.com',
      password: '1234',
      role: 'admin'
    });

    const {req: req1, res: res1} = createMocks({
      method: 'PATCH',
      url: `/account/${accountRes.íd}`,
      headers: {
        authorization: token
      },
      query: {
        emailHex: accountRes.id
      },
      body: {
        ocupation: 'developer'
      }
    });

    await singleAccount(req1, res1);

    expect(res1._getStatusCode()).toBe(200);
    expect(JSON.parse(res1._getData())).toMatchObject({
      status: 'OK'
    });
    
    const add = await Accounts.findOne({_id: accountRes.id}, null, {lean: true});
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
      subdomain: testID
    });

    const {req: req2, res: res2} = createMocks({
      method: 'PATCH',
      url: `/account/${accountRes.íd}`,
      headers: {
        authorization: token
      },
      query: {
        emailHex: accountRes.id
      },
      body: {
        name: 'Juan'
      }
    });

    await singleAccount(req2, res2);

    expect(res1._getStatusCode()).toBe(200);
    expect(JSON.parse(res1._getData())).toMatchObject({
      status: 'OK'
    });

    const patch = await Accounts.findOne({_id: accountRes.id}, null, {lean: true});
    expect(patch).toMatchObject({
      lastname: 'Gonzalez',
      name: 'Juan',
      firstTime: true,
      isSubscribeToNewsletter: false,
      email: 'account-patch@test.com',
      ocupation: 'developer',
      password: /\$2b\$10\$(\w|\.|\/){53}/i,
      role: 'admin',
      __v: 0,
      _id: /[a-z0-9]{12,24}/,
      subdomain: testID
    });
  })
});

afterAll(async () => {
  await Accounts.deleteMany({
    subdomain: testID
  });

  (await connect()).connection.close();
});
