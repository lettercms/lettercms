import crypto from 'crypto';
import jobs from '@lettercms/models/jobs';

const generateID = () => crypto.randomUUID();

const generateTime = timeString => {
  const d = new Date(timeString);

  const min = d.getUTCMinutes();
  const hour = d.getUTCHours();
  const date = d.getUTCDate();
  const month = d.getUTCMonth() + 1;

  return `${min} ${hour} ${date} ${month} *`;
};

const schedule = async (date, req) => {
  try {
    const jobId = `lettercms-${generateID()}`;

    const time = generateTime(date);

    const res = await fetch(`https://qstash.upstash.io/v1/publish/${req.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Upstash-Cron': time,
        'Authorization': `Bearer ${process.env.QSTASH_TOKEN}`,
        'Upstash-Forward-Authorization': req.token,
        'Upstash-Forward-X-Job-Id': jobId
      },
      body: JSON.stringify(req.body)
    });

    if (!res.ok)
      return Promise.reject();

    const {scheduleId} = await res.json();

    await jobs.create({
      jobId,
      scheduleId
    });

    return Promise.resolve();
  } catch(err) {
    return Promise.reject(err);
  }
};

export default schedule;
