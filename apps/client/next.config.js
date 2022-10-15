const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

const withTM = require("next-transpile-modules")([
  "@lettercms/ui",
  "@lettercms/models",
  "@lettercms/sdk",
  '@lettercms/eslint-config'
]);

const isDev = process.env.NODE_ENV !== 'production';

const cfg = withTM({
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  poweredByHeader: false,
  env: {
    LETTERCMS_ENDPOINT: process.env.LETTERCMS_ENDPOINT,
    ASSETS_BASE: isDev ? 'http://localhost:3003' : 'https://cdn.jsdelivr.net/gh/lettercms/lettercms/apps/cdn/public'
  },
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true
  },
   async headers() {
    return [
      {
        source: '/api/revalidate',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST,OPTIONS,HEAD'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
          },
        ]
      }
    ];
  }
});

const sentryWebpackPluginOptions = {
  silent: true
}

module.exports = withSentryConfig(cfg, sentryWebpackPluginOptions);
