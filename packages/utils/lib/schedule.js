import crypto from 'node:crypto';

const generateID = () => crypto.randomUUID();

const generateTime = timeString => {
  const d = new Date(timeString);

  const min = d.getUTCMinutes();
  const hour = d.getUTCHours();
  const date = d.getUTCDate();
  const month = d.getUTCMonth() + 1;

  return `${min} ${hour} ${date} ${month} *`;
};

const generateQueries = obj => `?${Object.entries(obj).map(e => `${e[0]}=${e[1]}`).join('&')}`;
const generateBody = obj => ` -d '{${Object.entries(obj).map(([key,value]) => {
  const _key = `\\"${key}\\": `;
  const _value = typeof value === 'string' ? `\\"${value}\\"` : value;

  return _key + _value;
})}'`;
const generateHeaders = obj => ` ${Object.entries(obj).map(e => `-H '${e[0]}: ${e[1]}'`).join(' ')}`;

const generateFile = (date, repoName, request) => `
on:
  schedule:
    - cron: "${generateTime(date)}"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - run: "curl -X ${request.method} ${request.url}${request.method === 'GET' ? generateQueries(request.query) : generateBody(request.body)} ${generateHeaders(request.headers)}"
      - run: "curl -X DELETE https://api.github.com/repos/lettercms/${repoName} -H 'Authorization: Bearer ${process.env.GITHUB_TOKEN}'"
`;

const schedule = async (date, req) => {
  try {
    const name = `lettercms-${generateID()}`;

    const res = await fetch('https://api.github.com/orgs/lettercms/repos', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        description: 'Schedule for LetterCMS',
        auto_init: true,
        private: true
      })
    });


    if (!res.ok)
      return Promise.reject();

    const action = generateFile(date, name, req);

    const uploadRes = await fetch(`https://api.github.com/repos/lettercms/${name}/contents/.github/workflows/schedule.yaml`, {
      method: 'PUT',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Uploaded myworkflow.yaml',
        committer:{
          name:'David\'s Devel',
          email:'djgm1206@gmail.com'
        },
        content: Buffer.from(action).toString('base64')
      })
    });

    return uploadRes.ok ? Promise.resolve() : Promise.reject();
  } catch(err) {
    return Promise.reject(err);
  }
};

export default schedule;
