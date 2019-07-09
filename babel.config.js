/**  @type {import('@types/babel__core').TransformOptions} */
const main = {
  babelrcRoots: ['.', 'packages/*'],
  plugins: ['babel-plugin-lodash'],
  env: {
    test: {
      presets: ['babel-preset-jest'],
    },
  },
}

module.exports = main
