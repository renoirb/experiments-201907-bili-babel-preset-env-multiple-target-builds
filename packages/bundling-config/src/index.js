const banner = require('./banner')
const package = require('./package')
const rollup = require('./rollup')
const utils = require('./utils')

module.exports = {
  ...banner,
  ...package,
  ...rollup,
  ...utils,
}
