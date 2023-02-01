const { spawn, execSync } = require('child_process');
const { appendFile } = require('fs/promises');
const { existsSync, mkdirSync, readFileSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

const {argv} = require('yargs');
const {workspaces, silent, disableLog} = argv;

process.env.DEBUG =  workspaces + ',info,' + (process.env.DEBUG ||  '');
const debug = require('debug');

const base = process.cwd();
const logPath = join(base, '.logs');
const envPath = join(base, '.env.local');

//Load values
const workspaceArray = workspaces ? workspaces.split(',') : ['api', 'dashboard', 'client']; 

const logger = async (workspace, text) => {
  if (disableLog && silent)
    return;

  if (!disableLog) {
    const date = new Date();

    const filename = `${workspace}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;
    const log = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} > ${text}`;

    const path = join(logPath, filename);

    await appendFile(path, log);
  }

  if (!silent)
    debug(workspace)(text.toString().replace(/\r?\n?$/, ''));
}

const envPorts = {
  client: '3002',
  dashboard: '3000',
  api: '3009'
};

(async function() {
  if (!existsSync(logPath))
    mkdirSync(logPath);


  //Check is workspace exists
  workspaceArray.forEach(e => {
    if (!(e in envPorts))
      throw new Error(`Workspace ${e} does not exists`);
  });

  // Init CDN server
  spawn('node', [join(base, 'scripts', 'serve-files')]);

  let envVars = {};

  if (existsSync(envPath)) {
    console.log(envPath, existsSync(envPath));

    debug('info')('Loaded .env.local');

    const env = readFileSync(envPath);

    if (env) 
      envVars = dotenv.parse(env);
  }

  workspaceArray.forEach(e => {
    const _child = spawn(join(base, 'node_modules', '.bin', 'next.cmd'), ['dev', join(base, 'apps', e), '--port', envPorts[e]], {
      env: {
        ...process.env,
        ...envVars,
        DEBUG: undefined
      }
    });

    _child.stdout.on('data', data => logger(e, data));

    _child.stderr.on('data', data => logger(e, data));

    _child.on('close', code => logger(e, `child process exited with code ${code}`));
  });
})();
