import accountAPI from '../../src/pages/api/_public/account';
import blogExists from '../../src/pages/api/_public/blog/exists';
import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/models/blogs';
import {createMocks} from 'node-mocks-http';
import bcrypt from 'bcrypt';

let id = null;
let secret = 'my-secret';

beforeAll(async () => {
  await connect();

  const hash = await bcrypt.hash(secret, 10);

  const blog = await blogs.findOne({subdomain: 'exists-subdomain'}, null, {lean: true});

  if (!blog) {
    const res = await blogs.create({
      subdomain: 'exists-subdomain',
      title: 'Blog de prueba',
      description: 'Blog de prueba',
      keys: [
        {
          name: 'Llave de prueba',
          hash
        }
      ]
    });
    
    id = res._id.toString();
  } else {
    id = blog._id.toString();
  }

});

describe('Authorization testing', () => {
  test('Unauthorized - No headers', async () => {
    const {req, res} = createMocks({
      method: 'GET',
      url: '/account'
    });

    await accountAPI(req, res);

    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Unauthorized'
    });
  });
  test('Unauthorized - ID without secret', async () => {
    const {req, res} = createMocks({
      method: 'GET',
      url: '/account',
      headers: {
        'x-lettercms-id': id
      }
    });

    await accountAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      status: 'bad-request',
      message: 'Please Provide a valid client ID and client Secret'
    });
  });

  test('Unauthorized - Secret without ID', async () => {
    const {req, res} = createMocks({
      method: 'GET',
      url: '/account',
      headers: {
        'x-lettercms-secret': secret
      }
    });

    await accountAPI(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      status: 'bad-request',
      message: 'Please Provide a valid client ID and client Secret'
    });
  });
});


describe('Exists Testing', () => {
  test('Exists', async () => {
    const {req, res} = createMocks({
      method: 'GET',
      url: '/blog/exists',
      headers: {
        'x-invoke-path': '/blog/exists'
      },
      query: {
        subdomain: 'exists-subdomain'
      }
    });

    await blogExists(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      exists: true
    });
  });
  test("Does not Exists", async () => {
    const {req, res} = createMocks({
      method: 'GET',
      url: '/blog/exists',
      headers: {
        'x-invoke-path': '/blog/exists'
      },
      query: {
        subdomain: 'not-exists-subdomain'
      }
    });

    await blogExists(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      exists: false
    });
  });
});

afterAll(async () => {
  await blogs.deleteOne({subdomain: 'exists-subdomain'});

  (await connect()).connection.close();
});