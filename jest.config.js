module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  setupFiles: ['<rootDir>/jest/jest.setup.js', '<rootDir>/jest/jest.mock.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
