import getOauth from './getOauth';

export default async function getAccessToken() {
  const {access_token} = await getOauth();

  return access_token;
}
