import createRequest from './createRequest';
import {login, getPages, api} from './fbUtils';

export const createAccount = data => createRequest('/api/account/create', 'POST', data);

export const createCollaborator = data => createRequest(`/api/collaborator/create`, 'POST', data);

export const createBlog = data => createRequest(`/api/blog/create`, 'POST', data);

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
  createRequest('/api/social/account', 'POST', {
    type: 'facebook',
    pageID,
    accessToken,
    subdomain
  });

export const setInstagramPage = (pageID, accessToken, subdomain)  =>
  createRequest('/api/social/account', 'POST', {
    type: 'instagram',
    pageID,
    accessToken,
    subdomain
  });
