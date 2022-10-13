import {readFile} from 'node:fs';
import {join} from 'node:path';

const isDev = process.env.NODE_ENV !== 'production';

const getTemplate = async type => {
  return new Promise((resolve, reject) => {
    if (/verify|reset-password/) {
      readFile(join(__dirname, `../templates/${type}.html`), {encoding: 'utf-8'}, (err, res) => {if (err) { reject(err);} else {resolve(res);}});
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
    if (isDev){
      console.log(data);
      return Promise.resolve();
    }

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
