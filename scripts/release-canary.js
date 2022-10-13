#!/usr/bin/env node
'use strict';
const {exec, spawn} = require('child_process');
const {parse} = require('semver');

const {join} = require('path');
const {writeFile} = require('fs/promises');

const _package = process.cwd() + '/package.json';

(async function() {
  try {
    const pack = require(_package);

    const {major, minor, patch} = parse(pack.version);

    const newVersion = await new Promise((resolve, reject) =>
      exec('git rev-parse --short HEAD', (err, res) => {
        if (err)
          return reject(err);

        resolve(`${major}.${minor}.${patch + 1}-${res.trim()}`);
      })
    )

    pack.version = newVersion;

    await writeFile(_package, JSON.stringify(pack, null, 2));

    console.log(`> ${pack.name} - ${pack.version}`);
  } catch(err) {
    throw err;
  }
})();
