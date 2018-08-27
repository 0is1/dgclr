const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.NODE_PORT': prod ? 8081 : 3000,
};
