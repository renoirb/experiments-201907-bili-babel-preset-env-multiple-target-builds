module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/?(*.)test.js'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/node_modules/(?!lodash-es)' /* For babel-plugin-lodash. @types/lodash-es, lodash-es */,
  ],
  moduleFileExtensions: ['ts', 'js', 'mjs', 'json'],
  expand: true,
  forceExit: true,
}
