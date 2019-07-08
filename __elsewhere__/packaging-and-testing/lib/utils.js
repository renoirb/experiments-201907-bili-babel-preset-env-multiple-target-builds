const { dependencies } = require('../package')

const log = (...args) => {
  if ('DEBUG' in process.env && process.env.DEBUG.length > 0) {
    console.log(...args)
  }
}

const rollupPluginAnalyzerOnAnalysis = ({ bundleSize }) => {
  const limitBytes = 1e6
  if (bundleSize < limitBytes) return
  console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`)
  return process.exit(1)
}

/**
 * Get a package version as string, without the semver constraint notation.
 *
 * @param {string} packageName The package.json package name to pick version string for
 * @param {Object.<string, string>=} dependenciesHashMap package.json’s dependencies hash map
 *
 * @returns {String|null} If core-js exists in the versions, the version number will be returned, otherwise null
 */
const extractPackageVersion = (packageName, dependenciesHashMap = {}) => {
  let version = null
  if (typeof packageName === 'string') {
    const dependenciesKeys = dependenciesHashMap
      ? Object.keys(dependenciesHashMap)
      : []
    if (dependenciesKeys.includes(packageName)) {
      const versionString = dependenciesHashMap[packageName]
      version = versionString.replace(/[^\d.]/g, '')
    }
  }

  return version
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

  log(
    `\n\n`,
    'mergeTransformOptions returned ',
    JSON.parse(JSON.stringify(merged)),
    `\n`
  )
  // console.log('mergeTransformOptions process.env ', process.env)

  return merged
}

const babelPresetEnvMergeTransformOptions = mergeTransformOptionsFactory(
  extractPackageVersion('core-js', dependencies)
)

module.exports = {
  babelPresetEnvMergeTransformOptions,
  extractPackageVersion,
  rollupPluginAnalyzerOnAnalysis,
  log,
}
