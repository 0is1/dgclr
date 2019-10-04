const NextI18Next = require('next-i18next').default;

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'fi',
  otherLanguages: ['en'],
});

module.exports = NextI18NextInstance;
