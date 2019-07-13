/**  @type {import('@types/babel__core').TransformOptions} */
const main = {
  babelrcRoots: ['.', 'packages/*'],
  plugins: [
    ['babel-plugin-lodash'],
    ['@babel/plugin-external-helpers'],
    ['@babel/plugin-proposal-optional-chaining'],
  ],
  env: {
    test: {
      presets: ['babel-preset-jest'],
    },
  },
}

module.exports = main
