#!/usr/bin/env node
'use strict';
const {exec, spawn} = require('child_process');
const {parse} = require('semver');
const getVersion = require('./get-last-version');
//const {argv} = require('yargs');

const {join} = require('path');
const {writeFile} = require('fs/promises');

//const {tag} = argv;

const _package = process.cwd() + '/package.json';

(async function() {
  try {
    const args = [
      'publish',
      '--access',
      'public',
      '--tag',
      'canary',
      '--registry',
      'https://registry.npmjs.com'
    ];

    // Write proxy registry token for this package to .npmrc.
    await exec(
      `echo //registry.npmjs.com/:_authToken=${process.env.NPM_TOKEN} > .npmrc`
    );

    //spawn('npm', args, { cwd: path });

  } catch(err) {
    throw err;
  }
})();
