const { jest } = require('@bindings/packaging-and-testing')

module.exports = {
  ...jest,
  moduleNameMapper: {
    '@bindings/helpers': '<rootDir>/src/index',
    '@bindings/packaging-and-testing':
      '<rootDir>/__elsewhere__/packaging-and-testing',
    '@bindings/linting': '<rootDir>/__elsewhere__/linting',
  },
}
