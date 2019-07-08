const pkg = require('./package')
const {
  bannerInfoExtract,
  packageExtractExternals,
  packageNameToModuleName,
  rollupPluginAnalyzerOnAnalysis,
  bannerFooterExtract,
} = require('@frontend-bindings/bundling-config')

const moduleName = packageNameToModuleName(pkg.name)
const banner = bannerInfoExtract(pkg)
const externals = packageExtractExternals(pkg)

/** @type {import('bili').ConfigOutput} */
const output = {
  format: ['cjs', 'es'],
  moduleName,
  extractCSS: false,
  target: 'node',
}

/**
 * https://bili.egoist.sh/#/plugins
 * https://github.com/egoist/bili/blob/master/src/index.ts#L158
 */
const plugins = {
  analyzer: {
    // rollup-plugin-analyzer
    // https://github.com/doesdev/rollup-plugin-analyzer
    stdout: true,
    onAnalysis(args) {
      return rollupPluginAnalyzerOnAnalysis.call(this, args)
    },
  },
  babel: {
    rootMode: 'upward',
  },
  postcss: false,
}

/** @type {import('bili').Config} */
module.exports = {
  input: 'src/index.js',
  output,
  plugins,
  externals,
  banner,
  outDir: 'dist',
  ...bannerFooterExtract(pkg),
}
