import train from '../lib/training';

export default async function Training() {
  const {req: {subdomain, params: {userID}}, res} = this;

  train(userID, subdomain);

  res.json({
    status: 'OK'
  });
}
