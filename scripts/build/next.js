#!/usr/bin/env node
'use strict';
const {execSync, spawn} = require('child_process');
const {parse} = require('semver');
const {root} = require('../utils');

const {join} = require('path');
const {writeFile} = require('fs/promises');

const {argv} = require('yargs');


(async function() {
  try {
    /*const nextBuild = spawn('node',  [join(root, 'node_modules/next/dist/bin/next'), 'build'], {
      stdio: 'inherit'
    });
    nextBuild.on()*/
    const b = await spawn('git',  ['status'], {
      stdio: 'inherit'
    });

    await new Promise(res => b.on('exit', res))
    console.log('done')

    //"deploy-preview": "vercel pull -y --scope lettercms -t $VERCEL_TOKEN && vercel build -t $VERCEL_TOKEN && vercel --prebuilt -t $VERCEL_TOKEN && vercel alias dashboard-davidsdevel-lettercms.vercel.app lettercms-preview.vercel.app -t $VERCEL_TOKEN"


  } catch(err) {
    throw err;
  }
})();
