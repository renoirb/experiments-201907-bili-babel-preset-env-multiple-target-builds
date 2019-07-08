const camelCase = require('lodash.camelcase')

const packageNameToModuleName = name =>
  camelCase(name.replace(/@/g, '').replace('/', '-'))

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
  const dependencies = Reflect.has(pkg, 'dependencies')
    ? Object.keys(pkg.dependencies)
    : []

  const peerDependencies = Reflect.has(pkg, 'peerDependencies')
    ? Object.keys(pkg.peerDependencies)
    : []

  const external = peerDependencies
    .concat(dependencies.filter(d => !peerDependencies.includes(d)))
    .sort((a, b) => String(a).localeCompare(b))

  return external
}

module.exports = {
  packageNameToModuleName,
  packageExtractVersion,
  packageExtractExternals,
}
