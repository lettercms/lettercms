import * as Sentry from '@sentry/nextjs';
import env from './config/env';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const isDev = process.env.NODE_ENV !== 'production';

Sentry.init({
  dsn: SENTRY_DSN || env.SENTRY_DSN,
  tracesSampleRate: 0.25,
  enabled: !isDev,
  debug: false,
  environment: 'client'
});
