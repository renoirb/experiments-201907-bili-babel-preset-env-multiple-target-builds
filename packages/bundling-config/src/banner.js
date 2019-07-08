const { packageExtractExternals } = require('./package')

/**
 * Extract Banner Info.
 *
 * @param {import('@schemastore/package')} pkg
 * @returns {import('bili').BannerInfo}
 */
const bannerInfoExtract = (
  /** @type {import('@schemastore/package')} */
  pkg
) => {
  let {
    author = 'CGI Inc.',
    name,
    version,
    license = 'UNLICENSED',
    ...pkgRest
  } = pkg

  if (Reflect.has(pkgRest, 'copyright.owner')) {
    author = pkgRest['copyright.owner']
  }

  /** @type {import('bili').BannerInfo} */
  const out = {
    name,
    version,
    author,
    license,
  }

  return out
}

/**
 * Extract banner and footer info out of package.json
 * Format them as string.
 *
 * @param {import('@schemastore/package')} pkg
 * @returns {Object.<string, string>}
 */
const bannerFooterExtract = (
  /** @type {import('@schemastore/package')} */
  pkg
) => {
  const external = packageExtractExternals(pkg)
  const package = bannerInfoExtract(pkg)

  const year = new Date().getFullYear()

  const repository =
    pkg.repository.url || '(TODO: Set repository.url in package.json)'
  const registry =
    pkg.publishConfig.registry ||
    '(TODO: Set publishConfig.registry in package.json)'

  const banner =
    '/*!\n' +
    ` * ${package.name} ${package.version}\n` +
    ` * (c) 2015-${year} ${package.author}\n` +
    ` *\n` +
    ` * Dependencies: ${external.join(', ')}\n` +
    ` *\n` +
    ` * Repository: ${repository}\n` +
    ` * Nexus registry: ${registry}\n` +
    ' */\n\n'

  const footer = `\n\n/* ${package.author} */\n`

  return {
    banner,
    footer,
  }
}

module.exports = {
  bannerInfoExtract,
  bannerFooterExtract,
}
