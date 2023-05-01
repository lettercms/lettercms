import {createMocks} from 'node-mocks-http';
import connect from '@lettercms/utils/lib/connection';
import existsAccount from '../../../src/pages/api/_public/account/exists';
import {Accounts} from '@lettercms/models/accounts';

const testID = 'exists-account';
const password = 'hello-world-23';

const generatePromise = async (query, exists) => {
  const {req, res} = createMocks({
    method: 'GET',
    url: '/account/exists',
    headers: {
      'x-invoke-path': '/account/exists'
    },
    query
  });

  await existsAccount(req, res);

  expect(res._getStatusCode()).toBe(200);
  expect(JSON.parse(res._getData())).toEqual({
    exists
  });

  return Promise.resolve();
}

beforeAll(async () => {
  await connect();

  await Accounts.createAccount(testID, {
    subdomain: testID,
    name: 'David',
    lastname: 'Gonzalez',
    firstTime: false,
    role: 'admin',
    isSubscribeToNewsletter: false,
    email:'exists-account@test.com',
    password,
    photo: 'photo-url'
  });
});

describe('Account API Testing - /account/exists', () => {
  test('GET - Exists Account', async () => {

    await Promise.all([
      generatePromise({name: 'David'}, true),
      generatePromise({lastname: 'Gonzalez'}, true),
      generatePromise({email: 'exists-account@test.com'}, true),
      generatePromise({subdomain: testID}, true)
    ]);
  });

  test('GET - Not Found', async () => {
    await generatePromise({
      email: 'does-not-exists@test.com'
    }, false);
  });
});

afterAll(async () => {
  await Accounts.deleteMany({
    subdomain: testID
  });

  (await connect()).connection.close();
});
