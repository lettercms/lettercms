import bcrypt from 'bcrypt';


/**
 * Sentry Proxy
 *
 * @description Proxy to parse sentry errors and send to Discord channel
 * 
 */
export default async function SentryProxy(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({
      message: 'Method Not Allowed'
    });

  const valid = await bcrypt.compare(req.query.key, process.env.SENTRY_WEBHOOK_KEY);

  if (!valid)
    return res.status(403).json({
      message: 'Bad Auth Key'
    });

  const {triggering_rules, event} = req.body;

  const {
    title,
    message,
    request,
    exception,
    tags,
    received
  } = event;

  const {lineno, pre_context, post_context, context_line, filename} = exception.values[0].stacktrace.frames.reverse()[0];

  let actualLine = lineno - pre_context.length;
  let linesString = '';

  const lines = pre_context.concat([context_line], post_context);

  lines.forEach(e => {
    if (actualLine === lineno) {
      linesString += '\n';
      linesString += `${actualLine++}| ${e}\n`;
      linesString += '^\n';

    }
    else
      linesString += `${actualLine++}| ${e}\n`;
  });

  const payload = {
    username: triggering_rules[0],
    embeds: [
      {
        title,
        type: 'rich',
        description: message,
        url: request.url,
        timestamp: new Date(received * 1000).toISOString(),
        color: 14695983,
        footer: {
          icon_url: 'https://github.com/fluidicon.png',
          text: 'lettercms/lettercms',
        },
        fields: [
          {
            name: '**Type**',
            value: exception.values[0].type 
          },
          {
            name: '**Filename**',
            value: filename
          },
          {
            name: '**Stacktrace**',
            value: '```jsx\n' + linesString + '```'
          }
        ]
      },
    ],
  };

  tags.forEach(([name, value]) => {
    if (
      ![
        'client_os.name',
        'browser.name',
        'handled',
        'level',
        'mechanism',
        'runtime',
        'sentry:release',
        'server_name',
        'vercel'
      ].includes(name)
    )
      payload.embeds[0].fields.push({
        name: `**${name}**`,
        value,
        inline: true
      });
  });

  fetch(process.env.DISCORD_WEBHOOK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(() => res.json({}))
  .catch(e => {
    throw e;
  });
}
