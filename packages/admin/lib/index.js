import createRequest from './createRequest';
import {login, getPages, api} from './fbUtils';

const isDev = process.env.NODE_ENV !== 'production';

const devEndpoint = 'http://localhost:3009';

const stagingEndpoint = 'https://api.lettercms.vercel.app';

const endpoint = isDev ? devEndpoint : stagingEndpoint;

const request = createRequest.bind({
  accessToken: process.env.LETTER_ACCESS_TOKEN
});


export const createAccount = data => request(`${endpoint}/api/account`, 'POST', data);

export const createCollaborator = data => request(`${endpoint}/api/collaborator`, 'POST', data);

export const createBlog = data => request(`${endpoint}/api/blog`, 'POST', data);

export const facebookLogin = scope => login(scope.join(','));

export const facebookPages = async fields => {
  try {
    const {data} = await getPages({fields: fields.join(',')});

    return Promise.resolve(data);
  } catch(err) {
    throw err;
  }
};

export const setFacebookPage = (pageID, accessToken, subdomain) =>
  request(`${endpoint}/api/social/account`, 'POST', {
    type: 'facebook',
    pageID,
    accessToken,
    subdomain
  });

export const setInstagramPage = (pageID, accessToken, subdomain)  =>
  request(`${endpoint}/api/social/account`, 'POST', {
    type: 'instagram',
    pageID,
    accessToken,
    subdomain
  });
