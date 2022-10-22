import getBucket  from '../image/operations/getBucket';
import processBlogger from './processBlogger';

export default async function importData() {
  const {req, res} = this;

  const {subdomain, account} = req;
  const {type} = req.body;

  const bucket  = await getBucket();

  const fileStream = bucket.file(`${subdomain}/${type}.xml`).createReadStream();

  let data = '';

  fileStream
    .on('data', chunk => {
      data += chunk.toString();
    })
    .on('error', err => {
      console.log(err);
      throw err;
    })
    .on('end', async () => {
      try {
        const r = await processBlogger(data, subdomain, account);
        await bucket.file(`${subdomain}/${type}.xml`).delete();
        console.log(r);

        res.json({
          status: 'OK'
        });
      } catch(err) {
        console.log(err);
        throw err;
      }
    });
}
