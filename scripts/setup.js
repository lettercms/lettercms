#!/usr/bin/env node
'use strict';
const {writeFileSync, appendFileSync, existsSync, rmSync} = require('fs');
const {join} = require('path');
const {randomBytes} = require('crypto');

const preGeneratedJWTKey = randomBytes(16).toString('hex')

const apiEnv = `## Paypal Sandbox 
PAYPAL_SANDBOX_CLIENT= 
PAYPAL_SANDBOX_SECRET= 

MONGO_URL=

# Firebase Admin Credentials. See https://firebase.google.com/docs/admin/setup
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

## Pregenerated JWT verify signature. Must be same on All apps 
JWT_AUTH=${preGeneratedJWTKey}

## Optional. Set QStash Tokens. See https://docs.upstash.com/qstash
QSTASH_TOKEN=
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=

## Optional. SendinBlue API key. See https://developers.sendinblue.com/docs/api-clients
SENDINBLUE_API_KEY=
`;

const dashboardEnv = `## Paypal Sandbox
PAYPAL_SANDBOX_CLIENT=
PAYPAL_SANDBOX_SECRET=

## Next Auth Envs
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

## Define LetterCMS API Endpoint
LETTERCMS_ENDPOINT=http://localhost:3009

MONGO_URL=

## Pregenerated JWT verify signature. Must be same on All apps 
JWT_AUTH=${preGeneratedJWTKey}

# Firebase Admin Credentials. See https://firebase.google.com/docs/admin/setup
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

## Unsplash API Keys
UNSPLASH_KEY=
`;

const clientEnv = `## Pregenerated JWT verify signature. Must be same on All apps 
JWT_AUTH=${preGeneratedJWTKey}

MONGO_URL=
`;


(async function() {
  try {
    const apiEnvPath = join('apps', 'api', '.env.local');
    const dashboardEnvPath = join('apps', 'dashboard', '.env.local');
    const clientEnvPath = join('apps', 'client', '.env.local');

    if (!existsSync(apiEnvPath))
      appendFileSync(apiEnvPath, '');


    if (!existsSync(dashboardEnvPath))
      appendFileSync(dashboardEnvPath, '');

    if (!existsSync(clientEnvPath))
      appendFileSync(clientEnvPath, '');

    writeFileSync(apiEnvPath, apiEnv);
    writeFileSync(dashboardEnvPath, dashboardEnv);
    writeFileSync(clientEnvPath, clientEnv);

  } catch(err) {
    throw err;
  }
})();
