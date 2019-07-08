const {
  utils: { rollupPluginAnalyzerOnAnalysis },
} = require('@bindings/packaging-and-testing')

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
  // https://github.com/egoist/bili/blob/master/test/index.test.ts#L223
  // target: 'node',
}

// https://github.com/egoist/bili/blob/master/src/index.ts#L158

/** https://bili.egoist.sh/#/plugins  */
const plugins = {
  analyzer: {
    // rollup-plugin-analyzer
    // https://github.com/doesdev/rollup-analyzer-plugin
    onAnalysis: rollupPluginAnalyzerOnAnalysis,
    stdout: true,
  },
  terser: {
    // rollup-plugin-terser
    // https://github.com/TrySound/rollup-plugin-terser
    // https://github.com/terser-js/terser#terser
    // https://github.com/terser-js/terser/blob/master/lib/output.js#L164
    output: {
      comments: /@preserve/gm,
      quote_style: 1,
      max_line_len: 1024,
      // preamble: '/* Hello world */', // Override Bili,Babel,Rollup top comment
    },
  },
  babel: {
    // rollup-plugin-babel
    // https://github.com/rollup/rollup-plugin-babel
    // https://github.com/trainorpj/rollup-babel-jest-setup/blob/master/rollup.config.js
    // https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
    externalHelpers: true,
    runtimeHelpers: true,
    plugins: [
      // Is this overwriting, or additive? rel=#ShouldWePutThis
      'module:@babel/plugin-external-helpers',
      'module:@babel/plugin-transform-runtime',
    ],
  },
  local: true,
  json: false,
  hashbang: false,
  postcss: false,
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
  extendConfig(config, arg) {
    // https://bili.egoist.sh/api/interfaces/configoutput.html
    const { target, name, ...configOutput } = config.output

    // config.output.target defaults to "node", but sometimes is undefined.
    // https://bili.egoist.sh/api/globals.html#outputtarget
    if (!target) {
      config.output.target = 'node'
    }

    // https://github.com/egoist/bili/blob/master/src/index.ts#L544
    // https://github.com/egoist/bili/blob/master/test/index.test.ts#L111

    if (target === 'node') {
      process.env.BROWSERSLIST = 'node 10'
    }

    let moduleName = 'fooBar'
    if (!config.output.moduleName) {
      config.output.moduleName = moduleName
    } else {
      moduleName = config.output.moduleName
    }

    const { BABEL_ENV, NODE_ENV, BROWSERSLIST } = process.env

    console.log('bili.config.js extendConfig 1', {
      name,
      target,
      configOutput: { ...configOutput },
      arg,
    })
    console.log('bili.config.js extendConfig 2', {
      BABEL_ENV,
      NODE_ENV,
      BROWSERSLIST,
    })
    // console.log('bili.config.js extendConfig config.plugins.babel', config.plugins.babel)

    return config
  },
}
