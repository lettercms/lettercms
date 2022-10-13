const fetch = require('node-fetch');

describe('Accounts API Testing', () => {
  test('Unauthorized', async () => {
    const res = await fetch('http://microservices:3009/api/account');

    expect(res.status).toEqual(401);
  });
});
