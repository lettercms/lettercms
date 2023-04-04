//TODO: Remove possibility

const { spawn, execSync } = require('child_process');
const {argv} = require('yargs');
const { readFileSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

const {fix} = argv;
const repos = [
  'dashboard',
  'utils',
  'admin',
  'icons',
  'models',
  'utils'
];

process.env.DEBUG =  repos.join(',') + ',info,' + (process.env.DEBUG ||  '');
const debug = require('debug');

const base = process.cwd();
const envPath = join(base, '.env.local');

const env = readFileSync(envPath);
const envParsed = dotenv.parse(env);

const logger = async (workspace, text) => debug(workspace)(text.toString().replace(/\r?\n?$/, ''));


(async function() {
  const yarnPath = join(__dirname, 'yarn.cmd');
  console.log(yarnPath);

  const execArgs = ['workspace', `@lettercms/${e}`, 'lint'];

  if (fix)
    execArgs.push('--fix');

  repos.forEach(e => {
    const _child = spawn(yarnPath, execArgs, {
      env: {
        ...process.env,
        ...envParsed,
        DEBUG: undefined
      }
    });

    _child.stdout.on('data', data => logger(e, data));

    _child.stderr.on('data', data => {
      logger(e, data);

      process.exit(1);
    });

    _child.on('close', code => logger(e, `child process exited with code ${code}`));
  });
})();
