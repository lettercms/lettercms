const { resolve } = require('path');
const { writeFile } = require('fs');
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

/*
 TODO: Get Messaging Key
 process.env.MESSAGING_KEY
*/

const files = [
  {
    src: resolve(__dirname, 'public', 'offline-sw.js'),
    dest: resolve(__dirname, '..', 'public', 'offline-sw.js'),
  },
  {
    src: resolve(__dirname, 'public', 'firebase-messaging-sw.js'),
    dest: resolve(__dirname, '..', 'public', 'firebase-messaging-sw.js'),
  },
  {
    src: resolve(__dirname, 'public', 'messaging.js'),
    dest: resolve(__dirname, '..', 'public', 'messaging.js'),
  },
];

/**
 *
 * Compile
 *
 * @param {StringPath} entry
 * @param {StringPath} output
 *
 * @return {Promise<void>}
 */
function compile(entry, output) {
  console.log('> Compiling - ', entry.match(/\w*(-\w*)*\.js$/)[0]);

  return new Promise((pRes, rej) => {
    babel.transformFile(entry, {
      minified: true,
      sourceMap: true,
      compact: true,
      presets: ['@babel/preset-env']
    }, (err, res) => {
      //console.log(res.map)
      if (err) {
        return rej(err);
      }

      const result = Terser.minify(res.code, {
        output: {
          beautify: false,
          comments: false,
        },
        compress: true,
        mangle: true,
      });

      if (result.error) {
        return rej(result.error);
      }

      writeFile(output, result.code
        .replace('process.env.FIREBASE_DATA', firebaseData)
        .replace('process.env.MESSAGING_KEY', process.env.MESSAGING_KEY),
        () => {
        console.log('> Compiled');
        pRes();
      });
    });
  });
}

async function main() {
  return Promise.all(files
    .map(({ src, dest }) => compile(src, dest)));
}

main()
  .then(() => console.log('Done.'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
