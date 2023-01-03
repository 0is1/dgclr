// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const localePath = path.resolve('./public/locales');

module.exports = {
  i18n: {
    defaultLocale: 'fi',
    locales: ['fi', 'en'],
  },
  localePath,
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
