import createRequest from './createRequest';

class BaseSDK {
  constructor(ID, token) {
    this.token = token;
    this.ID = ID;
  }
  static async api(path, method, data) {
    if (!data && typeof method === 'object') {
      data = method;
      method = 'GET';
    }

    return createRequest(path, method, data);
  }
  static async exchangeToken(token) {
    try {
      const {access_token} = await createRequest('/oauth/access_token', 'POST', {
        grant_type: 'fb_exchange_token',
        client_id: process.env.FB_APP_ID,
        client_secret: process.env.FB_APP_SECRET,
        fb_exchange_token: token
      });

      return Promise.resolve(access_token);

    } catch(err) {
      return Promise.reject(err);
    }
  }
  /**
   * Base Request
   *
   * @param {string} path
   * @param {string | object | Array<string>} method?
   * @param {object | Array<string>} data?
   *
   * @return {Promise<object>}
   */
  _baseRequest(path, method, data) {
    if (!data && typeof method === 'object') {
      data = method;
      method = 'GET';
    }

    return createRequest(path, method, {
      access_token: this.token,
      ...data
    });
  }
}

export default BaseSDK;

/*pages_show_list
pages_manage_ads,
pages_manage_metadata,
pages_read_engagement,
pages_read_user_content.

pages_manage_posts,
pages_manage_engagement.
*/