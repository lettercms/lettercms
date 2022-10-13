const {get} = require('https');
const semver = require('semver');

const fetch = url => {
  return new Promise(resolve => {
    get(url, res => {
      const {location} = res.headers;
      if (location)
        resolve(fetch(`https://unpkg.com${location}`));
      else
        res.on('data', e => {
          const json = e.toString();
          const {version} = JSON.parse(json);
          resolve(version)
        })
    })
  })
}

async function getVersion(pkg) {
  const version = await fetch(`https://unpkg.com/${pkg}/package.json`);

  return semver.parse(version);
}

module.exports = exports = getVersion;
