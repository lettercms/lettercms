import createRequest from './createRequest';
import {login, getPages} from './fbUtils';

export const createAccount = data => createRequest('/api/account/create', 'POST', data);

export const createCollaborator = data => createRequest('/api/collaborator/create', 'POST', data);

export const createBlog = data => createRequest('/api/blog/create', 'POST', data);

export const facebookLogin = scope => login(scope.join(','));

export const facebookPages = fields => getPages({fields: fields.join(',')});

export const setFacebookPage = (pageID, accessToken, subdomain) =>
  createRequest('/api/social/create', 'POST', {
    type: 'facebook',
    pageID,
    accessToken,
    subdomain
  });

export const setInstagramPage = (pageID, accessToken, subdomain)  =>
  createRequest('/api/social/create', 'POST', {
    type: 'instagram',
    pageID,
    accessToken,
    subdomain
  });
