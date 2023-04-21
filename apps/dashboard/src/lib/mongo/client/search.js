import {existsBlog} from './blogs';
import jwt from 'jsonwebtoken';

export async function getSearch({query: {q, subdomain}}) {
  const _existsBlog = await existsBlog(subdomain);

  if (_existsBlog)
    return {
      props: {
        q,
        accessToken: jwt.sign({subdomain}, process.env.JWT_AUTH)
      }
    };

  return {
    redirect: {
      permanent: true,
      destination: 'https://lettercms.vercel.app'
    }
  };
}
