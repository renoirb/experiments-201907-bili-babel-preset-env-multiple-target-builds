const babel = require('rollup-plugin-babel')

console.log('rollup-plugin-local 1')

/**
 * https://github.com/rollup/rollup-plugin-babel#example
 * https://github.com/egoist/bili/blob/master/test/index.test.ts#L205
 * https://github.com/egoist/bili/blob/master/test/fixtures/custom-rollup-plugin/index.js
 */

const main = babel.custom(core => {
  console.log('rollup-plugin-local 2 core', core)

  return {
    name: 'rollup-plugin-local',

    // Passed the plugin options.
    options({
      /** @type {import('bili').BabelPresetOptions} */
      presetOptions,
      ...pluginOptions
    }) {
      console.log('rollup-plugin-local 4 options', {
        presetOptions,
        pluginOptions,
      })
      return {
        // Pull out any custom options that the plugin might have.
        customOptions: {
          presetOptions,
        },

        // Pass the options back with the two custom options removed.
        pluginOptions,
      }
    },

    config(cfg, data) {
      // process.env.BROWSERSLIST = 'node 10'
      const BROWSERSLIST = process.env.BROWSERSLIST

      console.log('rollup-plugin-local 3 config', { cfg, data, BROWSERSLIST })

      return {
        ...cfg.options,
        presets: [...(cfg.options.presets || [])],
      }
    },
  }
})

module.exports = main
