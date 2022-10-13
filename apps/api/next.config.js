/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@lettercms/ui",
  "@lettercms/models",
  "@lettercms/utils",
  "@sentry/nextjs"
]);

const isDev = process.env.NODE_ENV !== 'production';
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = withTM({
  swcMinify: true,
  compiler: {
    removeConsole: !isDev
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  poweredByHeader: false,
});

const sentryWebpackPluginOptions = {
  silent: true
}

if (isDev)
  module.exports = nextConfig;
else
  module.exports = withSentryConfig({
    ...nextConfig,
    sentry: {
      hideSourceMaps: true
    },
  }, sentryWebpackPluginOptions);

