const { packageExtractVersion } = require('./package')

const { dependencies } = require('../package')

const rollupPluginAnalyzerOnAnalysis = ({ bundleSize }) => {
  const limitBytes = 1e6
  if (bundleSize < limitBytes) return
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`)
  return process.exit(1)
}

/**
 * Generate a Babel TransformOptions configuration object.
 *
 * See also:
 * - https://new.babeljs.io/docs/en/next/babel-preset-env.html
 * - https://babeljs.io/docs/en/babel-preset-env
 * - https://github.com/rollup/rollup-plugin-babel
 * - https://github.com/trainorpj/rollup-babel-jest-setup/blob/master/rollup.config.js
 *
 * @return {import('@types/babel__core').TransformOptions}
 */
const mergeTransformOptionsFactory = (coreJsVersion = null) => (
  /** @type {import('@types/babel__core').TransformOptions} */ opts = {}
) => {
  /** @type {import('@types/babel__core').TransformOptions} */
  const defaults = {
    // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpreset-env
    useBuiltIns: 'usage',
  }

  if (typeof coreJsVersion === 'string') {
    // Add exact package.json's core-js package version
    defaults.corejs = coreJsVersion
  }

  /** @type {import('@types/babel__core').TransformOptions} */
  const merged = JSON.parse(
    JSON.stringify({
      ...defaults,
      ...opts,
    })
  )

  return merged
}

const rollupBabelEnvTransformOptions = mergeTransformOptionsFactory(
  packageExtractVersion('core-js', dependencies)
)

module.exports = {
  rollupPluginAnalyzerOnAnalysis,
  rollupBabelEnvTransformOptions,
}
