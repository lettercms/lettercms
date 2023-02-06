#!/usr/bin/env node
'use strict';

const {writeFileSync, appendFileSync, existsSync, rmSync} = require('fs');
const {join} = require('path');
const {randomBytes} = require('crypto');

const preGeneratedJWTKey = randomBytes(16).toString('hex');
const preGeneratedNextAuthKey = randomBytes(16).toString('hex');

const env = `## Next Auth Envs
NEXTAUTH_SECRET=${preGeneratedNextAuthKey}
NEXTAUTH_URL=http://localhost:3000

LETTERCMS_SUBDOMAIN=
MONGO_URL=

## Pregenerated JWT verify signature
JWT_AUTH=${preGeneratedJWTKey}

## Firebase Admin Credentials. See https://firebase.google.com/docs/admin/setup
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

## Firebase public Setup. See https://firebase.google.com/docs/web
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

## Unsplash API Keys. See https://insplash.com/developers
UNSPLASH_KEY=

## Optional. SendinBlue API key. See https://developers.sendinblue.com/docs/api-clients
SENDINBLUE_API_KEY=

## Optional. Set QStash Tokens. See https://docs.upstash.com/qstash
QSTASH_TOKEN=
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=
`;

(async function() {
  try {
    if (!existsSync('.env.local'))
      appendFileSync('.env.local', '');

    writeFileSync('.env.local', env);

  } catch(err) {
    throw err;
  }
})();
