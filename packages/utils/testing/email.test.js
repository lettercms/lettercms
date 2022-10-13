process.env.NODEMAILER_EMAIL = 'davidsdevel@gmail.com';
process.env.NODEMAILER_PASSWORD = '753035726364113';

const sendMail = require('./lib/sendMail');

describe('Send Mail test', () => {
  test('> Sending email', async () => {
    const {accepted, response} = await sendMail('davidsdevel@gmail.com', 'Testing',
    {
      CI_PROJECT_NAME: 'lettercms',
      CI_COMMIT_REF_SLUG: 'master',
      type: 'testing'
    });

    expect(accepted.lenght).toBe(1);
    expect(response).toMatch(/250 2\.0\.0 OK/);

  });
});
