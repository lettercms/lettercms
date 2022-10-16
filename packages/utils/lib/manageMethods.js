import {withSentry} from '@sentry/nextjs';
import cors from './cors';
import connect from './connection';
import jobs from '@lettercms/models/jobs';
import usage from '@lettercms/models/usages';

export default function manageMethods(methods) {
  if (process.env.LETTERCMS_MAP_ROUTES)
    return Object.keys(methods);

   const handler = async function(req, res) {
    try {
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.setHeader('Vary', 'Origin');

        res.statusCode = 200;
        res.setHeader('Content-Length', '0');

        return res.end();
      }

      const pass = cors(req, res);

      if (typeof pass === 'object')
        return res.status(400).json(pass);

      if (!pass) {
        res.status(401);
        return res.end();
      }

      if (!(req.method in methods)) {
        res.status(405);
        return res.end();
      }

      await connect(); 

      const methodFn = methods[req.method].bind({
        req,
        res
      });

      await methodFn();

      //Delete QStash schedule if exists
      const jobId = req.headers['x-job-id'];
      if (jobId) {
        const {scheduleId} = await jobs.findOne({jobId});

        const deleteRes = await fetch(`https://qstash.upstash.io/v1/schedules/${scheduleId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${process.env.QSTASH_TOKEN}`
          },
        });

        if (deleteRes.ok) {
          await jobs.deleteOne({jobId});
          await usage.updateOne({subdomain}, {$inc: {socialSchedule: -1}});
        }
      }
    } catch(err) {

      res.status(500).send({
        status: 'server-error'
      });

      return Promise.reject(err);
    }
  };

  return withSentry(handler);
};
