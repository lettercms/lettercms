import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const isDev = process.env.NODE_ENV !== 'production';

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 0.25,
  //Only enabled on production env
  enabled: !isDev && !!SENTRY_DSN,
  debug: isDev,
  environment: 'dashboard'
});
