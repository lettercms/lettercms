
const {argv} = require('yargs');
const {workspaces} = argv;

process.env.DEBUG =  workspaces + ',' + (process.env.DEBUG ||  '');

const { spawn, execSync } = require('child_process');
const { appendFile } = require('fs/promises');
const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const debug = require('debug');

const workspaceArray = workspaces.split(','); 

const base = process.cwd();
const logPath = join(base, '.logs');

//TODO: add shared env vars on development
//require('dotenv').config({ path: join(base, '.env')});

const logger = async (workspace, text) => {
  const date = new Date();

  const filename = `${workspace}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;
  const log = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} > ${text}`;

  const path = join(logPath, filename);

  await appendFile(path, log);
  
  debug(workspace)(text.toString().replace(/\r?\n?$/, ''));
}

(async function() {
  if (!existsSync(logPath))
    mkdirSync(logPath);

  const cdn = spawn('node', [join(base, 'scripts', 'serve-files')]);

  if (workspaceArray.includes('api')) {
    const api = spawn(join(base, 'node_modules', '.bin', 'next.cmd'), ['dev', join(base, 'apps', 'api'), '--port', '3009']);
    api.stdout.on('data', (data) => {
      logger('api', data);
    });

    api.stderr.on('data', (data) => {
      logger('api', data);
    });

    api.on('close', (code) => {
      logger('api', `child process exited with code ${code}`);
    });
  }
  
  if (workspaceArray.includes('dashboard')) {
    const dashboard = spawn(join(base, 'node_modules', '.bin', 'next.cmd'), ['dev', join(base, 'apps', 'dashboard'), '--port', '3000']);
    dashboard.stdout.on('data', (data) => {
      logger('dashboard', data);
    });

    dashboard.stderr.on('data', (data) => {
      logger('dashboard', data);
    });

    dashboard.on('close', (code) => {
      logger('dashboard', `child process exited with code ${code}`);
    });
  }

  if (workspaceArray.includes('client')) {
    const client = spawn(join(base, 'node_modules', '.bin', 'next.cmd'), ['dev', join(base, 'apps', 'client'), '--port', '3002']);
    client.stdout.on('data', (data) => {
      logger('client', data);
    });

    client.stderr.on('data', (data) => {
      logger('client', data);
    });

    client.on('close', (code) => {
      logger('client', `child process exited with code ${code}`);
    });
  }

})()