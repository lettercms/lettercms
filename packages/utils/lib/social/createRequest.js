const toQuery = data => `?${Object.entries(data).map(e => `${e[0]}=${e[1]}`).join('&')}`;

const endpoint = 'https://graph.facebook.com';

export default async function createRequest(path, method, data) {
  const hasNotMethod = typeof method === 'object' && !data;

  const dataParam = hasNotMethod ? method : data;
  const methodParam = hasNotMethod ? 'GET' : method;
  
  const hasQuery = !!data;
  const isGet = methodParam === 'GET';

  const query = toQuery(dataParam);
  let body;
  if (!isGet)
    body = query.replace(/^\?/, '');

  try {
    const res = await fetch(`${endpoint}${path}${isGet && hasQuery ? query : ''}`, {
      method: methodParam,
      body
    });

    return res.json();
  } catch(err) {
    return Promise.reject(err);
  }
}; 