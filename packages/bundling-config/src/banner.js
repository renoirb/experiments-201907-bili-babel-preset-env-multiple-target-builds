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
  const defaultAuthor = 'ACME Corporation'
  let {
    author = defaultAuthor,
    name,
    version,
    license = 'UNLICENSED',
    ...pkgRest
  } = pkg

  if (Reflect.has(pkgRest, 'copyright.owner')) {
    author = pkgRest['copyright.owner']
  }

  if (typeof author !== 'string') {
    author = defaultAuthor
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
  pkg,
  target = undefined,
  format = undefined
) => {
  const external = packageExtractExternals(pkg)
  const dependencies = external.length > 0 ? external.join(', ') : '(none)'
  const { repository = {}, publishConfig = {}, description } = pkg
  const bannerInfo = bannerInfoExtract(pkg)

  const year = new Date().getFullYear()

  const { url: repositoryUrl } = repository
  const { registry: publishConfigRegistryUrl } = publishConfig

  const banner =
    '/*!\n' +
    ` * ${bannerInfo.name} ${bannerInfo.version}\n` +
    ` *\n` +
    ` * ${description}\n` +
    ` *\n` +
    ` * (c) 2015-${year} ${bannerInfo.author}\n` +
    ` *\n` +
    ` * Dependencies: ${dependencies}\n` +
    ` *\n` +
    (target ? ` * Target runtime: ${target}\n` : '') +
    (format ? ` * Output format: ${format}\n` : '') +
    (repositoryUrl ? ` * Repository: ${repositoryUrl}\n` : '') +
    (publishConfigRegistryUrl
      ? ` * Nexus repository: ${publishConfigRegistryUrl}\n`
      : '') +
    ' */\n\n'

  const footer = `\n\n/* ${bannerInfo.author} */\n`

  return {
    banner,
    footer,
  }
}

module.exports = {
  bannerInfoExtract,
  bannerFooterExtract,
}
