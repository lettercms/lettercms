const { resolve } = require('path');
const { writeFile, readdirSync } = require('fs');
const babel = require('@babel/core');
const Terser = require('terser');

const firebaseData = JSON.stringify({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

const files = readdirSync('./public').map(dir => ({
  src: resolve(__dirname, 'public', dir),
  dest: resolve(__dirname, '..', 'public', dir)
}));

const babelOpts = {
  minified: true,
  sourceMap: true,
  compact: true,
  presets: ['@babel/preset-env']
};

const terserOpts = {
  output: {
    beautify: false,
    comments: false,
  },
  compress: true,
  mangle: true,
};

/*
 TODO: Get Messaging Key
 process.env.MESSAGING_KEY
*/


/**
 *
 * Compile
 *
 * @param {StringPath} entry
 * @param {StringPath} output
 *
 * @return {Promise<void>}
 */
async function compile(entry, output) {
  const name = entry.match(/\w*(-\w*)*\.js$/)[0];

  console.log('> Compiling - ', name); //eslint-disable-line

  const code = await new Promise((resolve, reject) => babel.transformFile(entry, babelOpts, (err, res) => {
    if (err)
      return reject(err);
    
    return resolve(res.code);  
  }));

  const minified = Terser.minify(code, terserOpts);

  if (minified.error)
    return Promise.reject(minified.error);

  const parsed = minified.code
    .replace('process.env.FIREBASE_DATA', firebaseData)
    .replace('process.env.MESSAGING_KEY', process.env.MESSAGING_KEY);

  return new Promise(resolve => {
    writeFile(output, parsed, () => {
      console.log('> Compiled - ', name); //eslint-disable-line
      resolve();
    });
  });
}

async function main() {
  return Promise.all(files
    .map(({ src, dest }) => compile(src, dest)));
}

main()
  .then(() => console.log('Done.')) //eslint-disable-line
  .catch(err => {
    throw err;
  });
