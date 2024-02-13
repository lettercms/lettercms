import config from './config';

export default async function getOauth() {
  const body = 'grant_type=client_credentials';

  const res = await fetch(`https://api.${config.environment === 'sandbox' ? 'sandbox.' : ''}paypal.com/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': body.length,
      Authorization: `Basic ${Buffer.from((config.environment === 'sandbox' ? config.sandbox_client_id : config.production_client_id) + ':' + (config.environment === 'sandbox' ? config.sandbox_secret : config.production_secret)).toString('base64')}`
    },
    body
  });

  return res.json();
};
