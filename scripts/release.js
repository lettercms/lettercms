#!/usr/bin/env node
'use strict';
const {execSync, spawn} = require('child_process');
const {parse} = require('semver');
const getVersion = require('./get-last-version');

const {join} = require('path');
const {writeFile} = require('fs/promises');

const _package = process.cwd() + '/package.json';

(async function() {
  try {

    //const commit = execSync('git log -1 --oneline --format=%s').toString();
    const commit = '[PATCH]';

    const matched = commit.match(/\[[A-Z]+\]/);

    if (!matched)
      return console.log('No new version');

    const versionType = matched[0];
    
    const pack = require(_package);

    let {major, minor, patch} = await getVersion(pack.name);

    if (versionType === '[PATCH]')
      patch++;
    if (versionType === '[MINOR]') {
      minor++;
      patch = 0;
    }
    if (versionType === '[MAJOR]') {
      patch = 0;
      minor = 0;
      major++;
    }

    const newVersion = `${major}.${minor}.${patch}`;

    pack.version = newVersion;
    console.log(pack)
    //await writeFile(_package, JSON.stringify(pack, null, 2));
    console.log(`> ${pack.name} - ${pack.version}`);

  } catch(err) {
    throw err;
  }
})();
