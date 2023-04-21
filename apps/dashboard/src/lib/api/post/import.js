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
      throw err;
    })
    .on('end', async () => {
      try {
        await processBlogger(data, subdomain, account);
        await bucket.file(`${subdomain}/${type}.xml`).delete();

        res.json({
          status: 'OK'
        });
      } catch(err) {
        throw err;
      }
    });
}
