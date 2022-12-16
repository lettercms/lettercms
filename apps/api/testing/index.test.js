import next from 'next';
import supertest from 'supertest';
import express from 'express';
import setup from './setup';
import connect from '@lettercms/utils/lib/connection';
import blogs from '@lettercms/models/blogs';
import bcrypt from 'bcrypt';

const app = next({ dev: true });
const server = setup(app, express());
const agent = supertest(server);

let id = null;
let secret = 'my-secret';

beforeAll(async () => {
  const mongo = await connect();

  const hash = await bcrypt.hash(secret, 10);
  
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

  mongo.disconnect();
});

describe('Authorization testing', () => {
  test('Unauthorized - No headers', done => {
    agent
      .get('/api/account')
      .expect(401, {
        message: 'Unauthorized'
      }, done);
  });
  test('Unauthorized - ID without secret', done => {
    agent
      .get('/api/account', {
        headers: {
          'x-lettercms-id': id
        }
      })
      .expect(400, {
        status: 'bad-request',
        message: 'Please Provide a valid client ID and client Secret'
      }, done);
  });
  test('Unauthorized - Secret without ID', done => {
    agent
      .get('/api/account', {
        headers: {
          'x-lettercms-secret': secret
        }
      })
      .expect(400, {
        status: 'bad-request',
        message: 'Please Provide a valid client ID and client Secret'
      }, done);
  });
});


describe('Exists Testing', () => {
  test('Exists', done => {
    agent
      .get('/api/blog/exists?subdomain=exists-subdomain')
      .expect(200, {
        exists: true
      }, done);
  });
  test("Does not Exists", done => {
    agent
      .get('/api/blog/exists?subdomain=not-exists-subdomain')
      .expect(200, {
        exists: false
      }, done);
  });
});