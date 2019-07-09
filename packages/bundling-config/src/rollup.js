const extendBabelPreset = require('./rollup-plugin-extend-babel-preset')
const { getBundlingConfigDependencyPackageVersion } = require('./package')

const onAnalysis = ({ bundleSize }) => {
  const limitBytes = 1e6
  if (bundleSize < limitBytes) return
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`)
  return process.exit(1)
}

/**
 * Setup rollup-plugin-extend-babel-preset Rollup plugin configuration based on switches.
 */
const createRollupPluginExtendBabelOptions = ({
  target = 'node',
  format = 'cjs',
  isTypeScript = false,
}) => {
  const corejs = getBundlingConfigDependencyPackageVersion('core-js')

  const onlyValidTarget = target === 'browser' ? target : 'node'

  const addToPluginOptions = {}

  /** @type {import('@frontend-bindigns/bundling-config').BundlingConfigOptions} */
  let customOptions = {
    target: onlyValidTarget,
    format,
  }

  if (isTypeScript === true) {
    customOptions.isTypeScript = true
  }

  if (typeof corejs === 'string') {
    // Add exact package.json's core-js package version
    customOptions.corejs = corejs
  }

  const pluginOptions = {
    customOptions,
    ...addToPluginOptions,
  }

  return pluginOptions
}

const analyzer = {
  // rollup-plugin-analyzer
  // https://github.com/doesdev/rollup-plugin-analyzer
  stdout: true,
  onAnalysis(args) {
    return onAnalysis.call(this, args)
  },
}

const main = ({ target = 'node', format = 'cjs', isTypeScript = false }) => {
  const config = {}

  const plugins = {
    analyzer,
  }

  plugins['extend-babel-preset'] = createRollupPluginExtendBabelOptions({
    target,
    format,
    isTypeScript,
  })

  config.resolvePlugins = {
    'extend-babel-preset': extendBabelPreset,
  }

  return {
    config,
    plugins,
  }
}

module.exports = main
