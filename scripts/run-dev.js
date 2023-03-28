const { spawn } = require('child_process');
const { existsSync, readFileSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

process.env.DEBUG =  'info,' + (process.env.DEBUG ||  '');
const debug = require('debug');

const base = process.cwd();
const envPath = join(base, '.env.local');


(async function() {

  // Init CDN server
  spawn('node', [join(base, 'scripts', 'serve-files')]);

  let envVars = {};

  if (existsSync(envPath)) {
    debug('info')('Loaded .env.local');

    const env = readFileSync(envPath);

    if (env) 
      envVars = dotenv.parse(env);
  }

  spawn(join(base, 'node_modules', '.bin', 'next.cmd'), ['dev', join(base, 'apps', 'dashboard')], {
    env: {
      ...process.env,
      ...envVars,
      DEBUG: undefined
    },
    stdio: 'inherit'
  });
})();
