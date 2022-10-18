const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');
const withTM = require("next-transpile-modules")([
  "@lettercms/ui",
  "@lettercms/models",
  "@lettercms/utils",
  "@lettercms/admin"
]);

const isDev = process.env.NODE_ENV !== 'production';

const appConfig = withTM({
  swcMinify: true,
  compiler: {
    removeConsole: !isDev
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  poweredByHeader: false,
  env: {
    LETTERCMS_ENDPOINT: process.env.LETTERCMS_ENDPOINT,
    PAYPAL_PRODUCTION_CLIENT: process.env.PAYPAL_PRODUCTION_CLIENT,
    PAYPAL_PRODUCTION: process.env.PAYPAL_PRODUCTION_CLIENT,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    TRACK_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJkb21haW4iOiJkYXZpZHNkZXZlbCIsImFjY291bnQiOiI2MjU0ZWEwZWQ4OTIzNzAwMDRkMzk0NmMiLCJpYXQiOjE2NTUwNjYzMDd9.7vHblwRXDSd7UMETXcdcbGGsaXlMGa8kLgDz96NDMRs',
    LETTER_ACCESS_TOKEN: process.env.LETTER_ACCESS_TOKEN,
    ASSETS_BASE: isDev ? 'http://localhost:3003' : 'https://cdn.jsdelivr.net/gh/lettercms/lettercms/apps/cdn/public'
  },
  images: {
    domains: [
      'cdn.jsdelivr.net',
      'lettercms-usercontent.vercel.app',
      'lettercms-cdn.vercel.app',
      'localhost',
      'storage.googleapis.com'
    ]
  },
  async rewrites() {
    return [
      {
        source: '/feed',
        destination: '/api/feed'
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/dashboard/config',
        destination: '/dashboard/config/blog',
        permanent: true
      }
    ]
  }
})

const sentryWebpackPluginOptions = {
  silent: true
}

if (isDev)
  module.exports = appConfig;
else
  module.exports = withSentryConfig({
    ...appConfig,
    sentry: {
      hideSourceMaps: true
    },
  }, sentryWebpackPluginOptions);
