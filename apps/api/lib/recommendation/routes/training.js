import train from '../lib/training';

export default async function() {
  const {req: {subdomain, params: {userID}}, res} = this;


  train(userID, subdomain)
    .then(() => console.log(`> Training done to user "${userID}"`));

  res.json({
    status: 'OK'
  });
}
