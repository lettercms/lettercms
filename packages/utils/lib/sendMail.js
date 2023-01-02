import https from 'https';

const isDev = process.env.NODE_ENV !== 'production';

const getTemplate = async type => {
  return new Promise((resolve, reject) => {
    if (/verify|invitation/.test(type)) {
      const req = https.get(`https://cdn.jsdelivr.net/gh/lettercms/lettercms/packages/utils/templates/${type}.html`, res => {
        let chunks = '';

        res.on('data', e => {
          chunks += e.toString();
        });

        res.on('end', () => resolve(chunks));
        res.on('error', reject);
      });
        
      req.on('error', reject);
    } else if (type === 'contact') {
      return resolve('<h1>Contacto para %title%</h1><br/><br/><br/>%data%');
    } else {
      return reject(`Incorrect type"${type}"`);
    }
  });
};

const filterTemplate = (template, data) => {
  if (data.type === 'contact') {
    let filtered = template.replace('%title%', data.__title);

    delete data.__title;
    delete data.type;

    const generatedData = Object.entries(data).map(([key, value]) => `<b>${key[0].toUpperCase() + key.slice(1).toLowerCase()}</b><br/>${value}<br/><br/>`);

    return filtered.replace('%data%', generatedData.join(''));
  }
  const dataEntries = Object.entries(data);

  let filteredTemplate = template;

  dataEntries.forEach(([key, value]) => (filteredTemplate = filteredTemplate.replace(`%${key}%`, value)));

  return filteredTemplate;
};

const sendMail = async (to, subject, data) => {
  if (isDev)
    return console.log(to, subject, data); //eslint-disable-line

  const template = await getTemplate(data.type);

  const mailOptions = {
    sender: {  
      name: 'LetterCMS',
      email: 'davidsdevel@gmail.com'
    },
    to:[  
      {  
        email: to,
        name:`${data.name} ${data.lastname}`
      }
    ],
    subject,
    tags:[data.type],
    htmlContent: filterTemplate(template, data),
  };

  const res = await fetch('https://api.sendinblue.com/v3/smtp/email', {
    method:'POST',
    headers: {
      accept: 'application/json',
      'api-key': process.env.SENDINBLUE_API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify(mailOptions)
  });

  return res.json();
};

export default sendMail;
