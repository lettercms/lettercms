const { spawn, execSync } = require('child_process');
const { appendFile } = require('fs/promises');
const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const base = process.cwd();
const logPath = join(base, '.logs');

const logger = async (workspace, text) => {
  const date = new Date();

  const filename = `${workspace}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.log`;
  const log = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} > ${text}`;

  const path = join(logPath, filename);

  await appendFile(path, log);
  
  console.log(`${workspace} >`, text.toString());
}

(async function() {
  if (!existsSync(logPath))
    mkdirSync(logPath);

  const api = spawn(join(base, 'node_modules', '.bin', 'next.cmd'), ['dev', join(base, 'apps', 'api'), '--port', '3009']);
  const dashboard = spawn(join(base, 'node_modules', '.bin', 'next.cmd'), ['dev', join(base, 'apps', 'dashboard'), '--port', '3000']);
  const cdn = spawn('node', [join(base, 'scripts', 'serve-files')]);

  api.stdout.on('data', (data) => {
    logger('api', data);
  });

  api.stderr.on('data', (data) => {
    logger('api', data);
  });

  api.on('close', (code) => {
    logger('api', `child process exited with code ${code}`);
  });
  
  dashboard.stdout.on('data', (data) => {
    logger('dashboard', data);
  });

  dashboard.stderr.on('data', (data) => {
    logger('dashboard', data);
  });

  dashboard.on('close', (code) => {
    logger('dashboard', `child process exited with code ${code}`);
  });

})()