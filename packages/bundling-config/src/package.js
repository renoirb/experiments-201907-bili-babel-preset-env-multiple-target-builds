const camelCase = require('lodash.camelcase')

const bundlingConfigPackage = require('../package')

const { cached } = require('./utils')

const packageNameToModuleName = cached(name =>
  camelCase(name.replace(/@/g, '').replace('/', '-'))
)

const getBundlingConfigDependencyPackageVersion = cached(packageName =>
  packageExtractVersion(packageName, bundlingConfigPackage.dependencies)
)

/**
 * Get a package version as string, without the semver constraint notation.
 *
 * @param {string} packageName The package.json package name to pick version string for
 * @param {Object.<string, string>=} dependenciesHashMap package.json’s dependencies hash map
 *
 * @returns {String|null} If core-js exists in the versions, the version number will be returned, otherwise null
 */
const packageExtractVersion = (packageName, dependenciesHashMap = {}) => {
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
 * Prevent transpiling what is in dependencies and peerDependencies
 *
 * @param {import('@schemastore/package')} pkg
 */
const packageExtractExternals = (
  /** @type {import('@schemastore/package')} */
  pkg
) => {
  const { peerDependencies = {}, dependencies = {} } = pkg

  const deps = Object.keys(dependencies)

  const externals = deps
    .concat(Object.keys(peerDependencies).filter(d => !deps.includes(d)))
    .sort((a, b) => String(a).localeCompare(b))

  return externals
}

module.exports = {
  packageNameToModuleName,
  packageExtractVersion,
  packageExtractExternals,
  getBundlingConfigDependencyPackageVersion,
}
