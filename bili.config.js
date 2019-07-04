const {
  author = 'Renoir Boulanger <contribs@renoirboulanger.com>',
  name = 'Untitled 1',
  version = 'development',
} = require('./package.json')

const banner = {
  name,
  version,
  author,
}

/** @type {import('bili').ConfigOutput} */
const output = {
  name,
  extractCSS: false,
  format: ['cjs', 'es'],
}

// https://github.com/egoist/bili/blob/master/src/index.ts#L158

/** https://bili.egoist.sh/#/plugins  */
const plugins = {
  babel: {
    // https://github.com/rollup/rollup-plugin-babel
    // https://github.com/trainorpj/rollup-babel-jest-setup/blob/master/rollup.config.js
    externalHelpers: true, // Works uncommented
    runtimeHelpers: true, // ^
    plugins: [
      // rel=#ShouldWePutThis
      // Should we copy-pasta this? Is this additive.
      'module:@babel/plugin-external-helpers', // Works uncommented
      'module:@babel/plugin-transform-runtime', // ^
    ],
  },
  terser: {
    // rollup-plugin-terser
    output: { comments: /^!/ }, // Was working before?
  },
  'node-resolve': {
    extensions: ['.js', '.json'],
  },
  // Unsure if they're enabled by default.
  commonjs: true,
  json: true,
}

/** @type {import('bili').Config} */
module.exports = {
  name: 'helpers',
  input: 'src/index.js',
  plugins,
  name: 'index',
  outDir: 'dist',
  banner,
  output,
}
