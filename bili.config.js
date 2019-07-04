const {
  version = 'development',
  name = 'Untitled 1',
  author = 'Renoir Boulanger <contribs@renoirboulanger.com>',
} = require('./package.json')

const banner = {
  name,
  version,
  author,
}

/** @type {import('bili').ConfigOutput} */
const output = {
  format: ['cjs', 'esm'],
  name,
  extractCSS: false,
}

// https://github.com/egoist/bili/blob/master/src/index.ts#L158

/** https://bili.egoist.sh/#/plugins  */
const plugins = {
  babel: {
    // https://github.com/rollup/rollup-plugin-babel
    // https://github.com/trainorpj/rollup-babel-jest-setup/blob/master/rollup.config.js
    plugins: ['module:@babel/plugin-external-helpers'],
    externalHelpers: true,
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
  input: 'src/index.js',
  plugins,
  name: 'index',
  outDir: 'dist',
  banner,
  output,
}
