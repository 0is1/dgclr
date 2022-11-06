/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["frisbeegolfradat.fi", "malluunen-dg.vercel.app"],
  },
  i18n,
};

module.exports = nextConfig;
