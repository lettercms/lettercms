import toQuery from './toQuery';
import fetch from 'isomorphic-unfetch';

export default async function createRequest(path, method, data) {
  const hasNotMethod = typeof method === 'object' && !data;

  const dataParam = hasNotMethod ? method : data;
  const methodParam = hasNotMethod ? 'GET' : method;

  const isGet = methodParam === 'GET';

  let query = '';

  let headers = {};

  let newData = {};

  if (isGet && !!dataParam) {
    if (Array.isArray(dataParam))
      newData = {
        fields: dataParam.join(',')
      };
    else {
      const dataObj = dataParam;

      if (dataObj.fields)
        newData.fields = dataObj.fields.join(',');
    }

    query = toQuery(newData);
  }

  if (!isGet)
    headers['Content-Type'] = 'application/json';

  try {
    const res = await fetch(`${path}${query}`, {
      method: methodParam,
      headers,
      body: !isGet && !!data ? JSON.stringify(data) : undefined
    });

    if (/json/.test(res.headers.get('content-type')))
      return res.json();

    return res.text();
  } catch(err) {
    return Promise.reject(err);
  }
}
