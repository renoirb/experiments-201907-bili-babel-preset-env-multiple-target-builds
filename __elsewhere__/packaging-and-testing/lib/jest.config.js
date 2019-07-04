module.exports = {
  testEnvironment: 'node',
  transform: {
    // #limitation-babel7-jest-typescript
    // @todo use ts-jest and/or rework for need to build before test
    // https://github.com/dalinarkholin/example-typescript-monorepo/blob/master/package.json#L50
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/?(*.)test.js', '<rootDir>/src/**/?(*.)test.ts'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/node_modules/(?!lodash-es)' /* For babel-plugin-lodash. @types/lodash-es, lodash-es */,
  ],
  moduleFileExtensions: ['ts', 'js', 'mjs', 'json'],
  expand: true,
  forceExit: true,
}
