const { bili } = require('@frontend-bindings/bundling-config')
const pkg = require('./package')

const input = {
  index: 'src/index.js',
  cli: 'src/cli.js',
}

/** @type {import('bili').ConfigOutput} */
const output = {
  format: ['esm', 'cjs'],
}

/** @type {import('bili').Config} */
module.exports = {
  input,
  output,
  ...bili.config(pkg),
}
