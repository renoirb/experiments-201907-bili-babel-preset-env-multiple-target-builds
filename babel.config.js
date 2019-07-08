/**  @type {import('@types/babel__core').TransformOptions} */
const main = {
  babelrcRoots: ['.', 'packages/*'],
  presets: [["bili/babel"]],
  plugins: [['babel-plugin-lodash']],
  env: {
    test: {
      presets: [['babel-preset-jest']],
    },
  },
}

module.exports = main
