#!/usr/bin/env node
'use strict';

const {writeFileSync, appendFileSync, existsSync, rmSync} = require('fs');
const {MongoClient, ServerApiVersion} = require("mongodb");
const {stdin: input, stdout: output} = require('process');
const {createSpinner} = require('nanospinner');
const readline = require('readline/promises');
const {randomBytes} = require('crypto');
const bcrypt = require('bcrypt');
const {join} = require('path');

const preGeneratedNextAuthKey = randomBytes(16).toString('hex');
const preGeneratedJWTKey = randomBytes(16).toString('hex');

const subdomain = 'lettercms';

function createDotEnvFile(mongoURI) {
  const dotEnvPath = join(__dirname, '..', 'apps/dashboard/.env');

  const env = `## Next Auth Envs
NEXTAUTH_SECRET=${preGeneratedNextAuthKey}
NEXTAUTH_URL=http://localhost:3000

NEXT_PUBLIC_VERCEL_URL=localhost:3000

MONGO_URL=${mongoURI}

## Pregenerated JWT verify signature
JWT_AUTH=${preGeneratedJWTKey}

##Facebook App Credentials
FB_APP_ID=
FB_APP_SECRET=

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

  if (!existsSync(dotEnvPath))
    appendFileSync(dotEnvPath, '');

  writeFileSync(dotEnvPath, env);
}

async function createAccount(collection, name, lastname, email, plainPassword) {
  const password = await bcrypt.hash(plainPassword, 10);

  return collection.insertOne({
    subdomain,
    photo: `https://avatar.tobi.sh/${Buffer.from(email).toString('hex')}.svg?text=${name[0]+lastname[0]}&size=250`,
    name,
    lastname,
    password,
    email,
    role: 'admin',
    firstTime: true,
    isSubscribeToNewsletter: false
  });
}

function createBlog(collection, user) {
  return collection.insertOne({
    subdomain,
    title: 'LetterCMS - Development Title',
    description: 'Description for development purpouse',
    owner: user.insertedId,
    isVisible: false,
    hasCustomRobots: false,
    robots: '',
    created: Date.now(),
    url: '1',
    categories: new Map(),
    tags: new Map(),
    mainUrl: '',
    thumbnail: 'https://cdn.jsdelivr.net/gh/lettercms/lettercms/apps/cdn/images/og-template.png',
    keys: []
  });
}

function createStats(collection) {
  return collection.insertOne({
    subdomain,
    creationDate: Date.now(),
    totalViews: 0,
    totalComments: 0,
    bounces: 0,
    subscriptors: 0
  });
}

function createUsage(collection) {
  return collection.insertOne({
    subdomain,
    postsVersions: 0,
    pages: 0,
    abTest: 0,
    statsReports: 0,
    statsRealtimeEnabled: false,
    socialSchedule: 0,
    socialAccounts: 0,
    emailsCampaign: 0,
    accountsCollabs: 0,
    accountsSingle: 0,
    filesStorage: 0,
    filesUpload: 0
  });
}

function createPost(collection, user) {
  const now = new Date();

  return collection.insertOne({
    subdomain,
    title: 'Yay! My firts post',
    description: 'You can use this description to get conversions',
    url: 'first-example',
    tags: ['example'],
    content: '<div>Hello World</div>',
    text: 'Hello World',
    author: user.insertedId,
    postStatus: 'published',
    created: now,
    published: now,
    updated: now,
    category: '',
    comments: 0,
    images: [],
    thumbnail: '',
    views: 0,
    isProtected: false
  });
}

async function initializeBlogData(db, name, lastname, email, password) {

  const accounts = db.collection('blogaccounts');
  const stats = db.collection('blogstats');
  const usage = db.collection('blogusages');
  const posts = db.collection('blogposts');
  const blogs = db.collection('blogs');

  const user = await createAccount(accounts, name, lastname, email, password);

  const [post] = await Promise.all([
    createPost(posts, user),
    createStats(stats),
    createUsage(usage),
    createBlog(blogs, user),
  ]);
}

(async function() {
  const rl = readline.createInterface({ input, output });
  let spinner;
  let client;

  try {
    const URI = await rl.question('Set your MongoDB URI: ');
    const name = await rl.question('Name: ');
    const lastname = await rl.question('Last name: ');
    const email = await rl.question('Admin email: ');
    const password = await rl.question('Admin password: ');

    spinner = createSpinner('Initializing data').start();

    client = new MongoClient(URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    const db = client.db()

    await client.connect();

    await initializeBlogData(db, name, lastname, email, password);

    createDotEnvFile(URI);

    spinner.success({text: 'Successfully initialized data'});
  } catch(err) {
    console.error(err);
    spinner.error({text: 'Error initializing data'});
  } finally {
    await client.close();
    process.exit(0);
  }
})();
