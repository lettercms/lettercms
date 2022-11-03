export function login(scope) {
  return new Promise((resolve, reject) => window.FB.login(resolve, {scope}));
}

export function getLoginStatus() {
  return new Promise((resolve, reject) => window.FB.getLoginStatus(resolve));
}

export function getPages(options) {
  return new Promise((resolve, reject) => window.FB.api('/me/accounts', resolve, options));
}

export function api(url, options) {
  return new Promise(resolve => window.FB.api(url, resolve, options));
}
