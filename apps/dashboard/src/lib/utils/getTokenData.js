import {cookies} from 'next/headers';
import jwt from 'jsonwebtoken';

function getToken() {
  const _cookies = cookies();

  const token = _cookies.get('next-auth.session-token') || _cookies.get('__Secure-next-auth.session-token');

  return token;
}

export default function getTokenData() {
  const token = getToken();

  return token ? jwt.verify(token.value, process.env.JWT_AUTH) : {};
}
