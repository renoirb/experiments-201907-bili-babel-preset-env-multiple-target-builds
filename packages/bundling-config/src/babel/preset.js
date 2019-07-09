const inherits = require('bili/babel')

/**
 * Placeholder to extend bili/babel Babel preset
 *
 * Instead of making projects use "bili/babel"
 *
 * ```
 * {
 *   "presets": ["bili/babel"]
 * }
 * ```
 *
 * We call it and have an opportunity to encapsulate logic for various
 * project stacks from here.
 *
 * - https://babeljs.io/docs/en/configuration
 * - https://babeljs.io/docs/en/config-files#config-function-api
 * - https://babeljs.io/docs/en/v7-migration-api#babel-plugins-presets
 * - https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/user-handbook.md#making-your-own-preset
 * - file: node_modules/@babel/core/lib/config/helpers/config-api.js}
 *
 * @param {import('@types/babel__core').ConfigAPI} api Babel 7 config-api first, required argument
 * @param {Object<string, any>?} options Babel preset options
 * @param {string} dirname Directory in which this preset was invoked on from
 */
const main = (
  /** @type {import('@types/babel__core').ConfigAPI} */
  api,
  options = {},
  /** @type {string|undefined} */
  dirname = undefined
) => {
  api.assertVersion(7)
  api.cache(true)

  /*
  console.log(
    '---------------- @frontend-bindings/bundling-config/babel-preset before ----------------',
    { options, dirname }
  )
  */

  // Call it as if it was actually it
  const base = inherits.call(null, api, options, dirname)

  // console.log('@frontend-bindings/bundling-config/babel-preset imported bili/babel', {...base})

  for (const preset of base.presets) {
    /**
     * Because bili/babel preset does NOT allow adding our own @babel/preset-env
     * We can insert it from here.
     */
    if (Array.isArray(preset) && Reflect.has(preset[1], 'modules')) {
      // Because it is an array, and the second element is an object with modules
      // We're assuming it is a @babel/preset-env
      // Let's inject our things here.
      preset[1] = { ...preset[1], ...options }
    }
  }

  const out = {
    ...base,
  }

  // console.log('@frontend-bindings/bundling-config/babel-preset after', out.presets)

  return out
}

module.exports = main
