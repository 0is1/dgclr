/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'frisbeegolfradat.fi',
      'malluunen-dg.vercel.app',
      'dgclr-server-course-maps-dev.s3.eu-central-1.amazonaws.com',
      'dgclr-server-course-maps-production.s3.eu-central-1.amazonaws.com',
    ],
  },
  i18n,
  output: 'standalone',
};

module.exports = nextConfig;
