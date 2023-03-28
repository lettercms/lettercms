const https = require('https');
const url = require('url');

const status = process.argv[2];
const env = process.argv[3];

const isFail = status === 'failed';

(async function() {
  let colorCode = 6245870;
  let description = '';

  const username = process.env.CIRCLE_PR_USERNAME || process.env.CIRCLE_PROJECT_USERNAME || process.env.CIRCLE_USERNAME;

  let fields = [];

  if (status === 'fail' || status === 'success') {
    fields = [
      { 
        name: "Job Number", 
        value: process.env.CIRCLE_BUILD_NUM
      }, 
      {
        name: "Job URL", 
        value: `[Visit Job](${process.env.CIRCLE_BUILD_URL})`
      },
      {
        name: 'URL',
        value: `[View Deployment](https://lettercms-${env}-${process.env.CIRCLE_BRANCH}.vercel.app)`
      }
    ];
  }

  if (status === 'fail') {
    description = `Ooops! The **${env}** app on **${process.env.CIRCLE_BRANCH}** branch wasn't deployed!`;
    colorCode = 15555676;
  } else if (status === 'success') {
    description = `Successfully deployed **${env}** app on **${process.env.CIRCLE_BRANCH}** branch!`;
    colorCode = 3394662;
  } else if (status === 'info') {
    description = `Starting Deployment of **${process.env.CIRCLE_BRANCH}** branch by [@${username}](https://github.com/${username})`;
    colorCode = 16250871;

    fields = [
      {
        name: 'Pull Request',
        value: `[View Changes](${process.env.CI_PULL_REQUEST})`
      }
    ];
  }

  const {hostname, path} = url.parse(process.env.DISCORD_DEPLOYMENT_WEBHOOK);

  const req = https.request({
    method: 'POST',
    hostname,
    path,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  req.write(JSON.stringify({
    embeds: [
      { 
        description,
        color: colorCode,
        fields
      } 
    ]  
  }));

  req.end();
})()
