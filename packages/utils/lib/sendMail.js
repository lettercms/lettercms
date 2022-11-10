import {readFile} from 'fs';
import {join} from 'path';
import https from 'https';

const isDev = process.env.NODE_ENV !== 'production';

const getTemplate = async type => {
  return new Promise((resolve, reject) => {
    if (/verify|invitation/) {
      const req = https.get(`https://cdn.jsdelivr.net/gh/lettercms/lettercms/packages/utils/templates/${type}.html`, res => {
        let chunks = '';

        res.on('data', e => {
          chunks += e.toString();
        });

        res.on('end', () => resolve(chunks));
        res.on('error', reject);
      });
        
      req.on('error', reject);
    }
  });
};

const filterTemplate = (template, data) => {
  const dataEntries = Object.entries(data);

  let filteredTemplate = template;

  dataEntries.forEach(([key, value]) => (filteredTemplate = filteredTemplate.replace(`%${key}%`, value)));

  return filteredTemplate;
};

const sendMail = async (to, subject, data) => {
  try {
    if (isDev)
      return console.log(to, subject, data);

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
      htmlContent: filterTemplate(template, data),
      tags:[data.type]
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
  } catch(err) {
    return Promise.reject(err);
  }
};

export default sendMail;
