const setCookie = (res, name, value, opts) => {
  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if (typeof opts.maxAge === 'number')
    opts.expires = new Date(Date.now() + optx.maxAge * 1000);

  res.setHeader('Set-Cookie', serialize(name, stringValue, opts));
};