const fetch = require('node-fetch');
const {argv} = require('yargs');

const {status, env} = argv;

const isFail = status === 'failed';

(async function() {
  const r = await fetch(process.env.DISCORD_DEPLOYMENT_WEBHOOK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      embeds: [
        { 
          //"description": , 
          description: isFail
            ? `Ooops! The **${env}** app on **${process.env.CIRCLE_BRANCH}** branch wasn't deployed!`
            : `Successfully deployed **${env}** app on **${process.env.CIRCLE_BRANCH}** branch!`,
          color: isFail
            ? 15555676
            : 3394662, 
          fields: [
            { 
              name: "Job Number", 
              value: process.env.CIRCLE_BUILD_NUM
            }, 
            { 
              name: "Job URL", 
              value: `[Visit Job](${process.env.CIRCLE_BUILD_URL})`
            }
            {
              name: 'URL',
              value: `[View Deployment](https://lettercms-${env}-${process.env.CIRCLE_BRANCH}.vercel.app)`
            }
          ]
        } 
      ] 
    })
  });
})()

//https://discord.gg/XxYCqGZsvT