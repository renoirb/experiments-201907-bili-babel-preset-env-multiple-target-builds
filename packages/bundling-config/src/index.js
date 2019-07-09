const bili = require('./bili')
const jest = require('./jest')
const package = require('./package')
const utils = require('./utils')

module.exports = {
  bili,
  jest,
  ...package,
  ...utils,
}
