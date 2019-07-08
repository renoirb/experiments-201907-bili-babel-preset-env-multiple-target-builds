const { jest } = require('@frontend-bindings/bundling-config')

module.exports = {
  ...jest,
  projects: ['<rootDir>/packages/*'],
}
