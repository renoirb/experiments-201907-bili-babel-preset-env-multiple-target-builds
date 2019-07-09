const babel = require('rollup-plugin-babel')
const merge = require('lodash.merge')

const TARGET_BROWSERS_BROWSERSLIST_STRING = 'ie >= 10, > 0.25%, not dead'

const TARGETS = Object.freeze({
  /**
   * We could be using Browserslist (https://browserl.ist/)
   * and/or leverage @babel/preset-env reading .browserslistrc
   * But not now. Maybe later.
   * https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
   */
  browser: Object.freeze({ browsers: TARGET_BROWSERS_BROWSERSLIST_STRING }),
  // Just assume current Node.js version.
  // This is handled by bili already.
  node: Object.freeze({ node: true }),
})

/**
 * customCallback for rollup-plugin-babel babelPluginFactory.
 *
 * https://github.com/renoirb/experiments-201907-bili-babel-preset-env-multiple-target-builds/blob/rollup-plugin-local/__elsewhere__/rollup-plugin-local/lib/index.js
 *
 * https://github.com/egoist/bili/blob/master/src/plugins/babel.ts#L6
 * https://github.com/egoist/bili/blob/master/src/babel/preset.ts
 * https://github.com/egoist/bili/blob/master/test/index.test.ts#L205
 * https://github.com/egoist/bili/blob/master/test/fixtures/custom-rollup-plugin/index.js
 * https://github.com/egoist/bili/blob/master/test/__snapshots__/index.test.ts.snap#L135
 *
 * https://github.com/rollup/rollup-plugin-babel#custom-plugin-builder
 * https://github.com/rollup/rollup-plugin-babel/blob/master/src/index.js#L131
 * https://github.com/rollup/rollup-plugin-babel/blob/master/src/index.js#L64
 * node_modules/rollup-plugin-babel/src/index.js
 */
const customCallback = babel.custom((
  /** @type {import('@types/babel__core')} */
  babelCore
) => {
  /**
   * At build time (only!) change @babel/preset-env
   *
   * This is a rollup-plugin-babel customCallback function in which we can
   * affect Babel behavior and code.
   */
  return {
    name: 'extend-babel-preset',

    // Passed the plugin options.
    // https://github.com/rollup/rollup-plugin-babel/blob/master/src/index.js#L38
    options({ customOptions, ...pluginOptions }) {
      // const options = { customOptions, pluginOptions }
      // console.log(
      //   'extend-babel-preset options 1',
      //   JSON.parse(JSON.stringify(options))
      // )

      const { DEBUG = false, BROWSERSLIST = false } = process.env
      const { corejs, target } = customOptions

      let out = {
        // Where we pass options to babel in relation to how to transform code
        // i.e. babel presets, etc.
        customOptions: merge({}, customOptions),
        pluginOptions: merge({}, pluginOptions),
      }
      // We will override our preset which extends @babel/preset-env
      const presetName = '@frontend-bindings/bundling-config/bili-babel'
      let presetEnvOptions = {}

      /**
       * If we got customOption.corejs with a string, we can tell
       * Babel to polyfill anything for our target that misses
       * For example, we're using something more modern than targeted platform
       */
      if (corejs) {
        // https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpreset-env
        presetEnvOptions.useBuiltIns = 'usage'
        presetEnvOptions.corejs = corejs
      }

      // If we have preset.env.DEBUG, we might also want to see @babel/preset-env's debug output too.
      if (DEBUG && DEBUG.length > 0) {
        presetEnvOptions.debug = true
      }

      /**
       * Quick and dirty way of setting Browserslist setting optionnally from preset.env
       *
       * We might override that property if BROWSERSLIST preset.env.BROWSERSLIST is defined.
       * https://github.com/browserslist/browserslist#queries
       *
       * But this could be done better.
       * That'll do for now.
       *
       * Usage example, from a package that has a bili.config.js:
       *
       *     export DEBUG='*,-babel'
       *     export BROWSERSLIST='> 0.5%, not samsung > 0'
       *     bili --format esm --target browser
       *
       * Which will show debugging information, tell a different Browserslist query selector,
       * Create an ESM (mjs, module, esnext module) bundle, for browsers.
       */
      if (Object.keys(TARGETS).includes(target)) {
        let targets = { ...TARGETS[target] }
        if (target === 'browser' && BROWSERSLIST) {
          // We can't use the same system for Node version.
          // Maybe we'll need this later?
          targets.browsers = BROWSERSLIST
        }
        presetEnvOptions.targets = targets
      }

      out.pluginOptions.presets = [[presetName, presetEnvOptions]]

      const merged = merge({}, out)

      return merged
    },
  }
})

module.exports = customCallback
