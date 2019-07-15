// THIS IS NORMALLY IMPORTED FROM ANOTHER MODULE

/**
 * Generate "targets" based on process.env NodeJS.ProcessEnv
 * @type {*}
 */
const createTargets = (
  /** @type {import('@types/node').ProcessEnv} */ processEnvArg
) => {
  const {
    NODE_ENV = 'development',

    /**
     * **** THERE IS A BETTER WAY ****
     * Have a look at:
     * https://github.com/renoirb/experiments-201907-bili-babel-preset-env-multiple-target-builds/blob/extending-bili/packages/bundling-config/src/rollup-plugin-extend-babel-preset.js#L87
     *
     * **** Trigger warning: This might be a bit too hacky! (it was worse a few hours ago) ****
     *
     * ====== CREATE MULTIPLE TARGET BUILD ======
     *
     * Grab NPM's lifecycle event name (i.e. the task name)
     * and let's change Babel's preset-env targets ONLY
     * when browser is part of the task name
     *
     * Our package.json has many tasks, for example:
     * - 'build:js'
     * - 'build:browser:cjs'
     * - 'build:browser:system'
     *
     * Because bili doesn't seem to support this.
     * Maybe that should be revised.
     *
     * See https://github.com/egoist/bili/issues/219
     */
    npm_lifecycle_event = 'build:js',
  } = processEnvArg

  let node = 10

  // .browserslistrc? How is it loaded?
  const browsers = [`last 2 versions`, 'ie >= 10']

  const isBrowserBuildUgglyHack = /^build:browser:/.test(npm_lifecycle_event)
  const isTest = /^test$/i.test(NODE_ENV)

  // https://new.babeljs.io/docs/en/next/babel-preset-env.html#targets
  let targets = {
    node,
    browsers,
  }

  if (!isBrowserBuildUgglyHack || isTest) {
    delete targets.browsers
  }
  // ===== /CREATE MULTIPLE TARGET BUILD ======

  return targets
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
const createTransformOptions = (hopefullyValidTargetArg = undefined) => {
  /** @type {import('@types/babel__core').TransformOptions} */
  let freshTransformOptions = {
    // https://new.babeljs.io/docs/en/next/babel-preset-env.html
    debug: true,
    // BEGIN rel=#ShouldWePutThis
    loose: true,
    corejs: '3.1.4', // match with root's core-js package version!
    modules: 'auto',
    shippedProposals: true,
    useBuiltIns: 'usage',
    // END rel=#ShouldWePutThis
  }

  if (hopefullyValidTargetArg) {
    try {
      const targets = JSON.parse(JSON.stringify(hopefullyValidTargetArg))
      freshTransformOptions.targets = targets
    } catch (e) {
      // Fail silently
    }
  }

  return freshTransformOptions
}

// https://babeljs.io/docs/en/config-files#config-function-api
module.exports = function babelConfig(
  /** @type {import('@types/babel__core').ConfigAPI} */ api
) {
  api.cache(false)
  api.assertVersion('^7.2')

  /**
   * #HowCanWeUseBabelConfigAPI
   * Figure how to properly use this babelConfig closure. #TODO
   * What else can we do with "api"?
   * How can we use api.env()?
   */

  const {
    DEBUG = '', // e.g. '*,-babel'
    NODE_ENV = 'development',
    npm_lifecycle_event = 'build:js',
  } = process.env
  const targets = createTargets(process.env)

  let plugins = []

  // https://bili.egoist.sh/#/recipes/javascript#babel
  let presets = []

  if (String(DEBUG).length > 0) {
    console.log('babel.config', {
      targets: JSON.parse(JSON.stringify(targets)),
      NODE_ENV,
      DEBUG,
      npm_lifecycle_event,
    })
  }

  // At https://github.com/egoist/bili/blob/master/src/index.ts#L158
  // If we put a log, we can see the target value.
  // console.log('bili createRollupConfig config.output.target', config.output.target)

  /**
   * #ShouldWePutThis
   * What should we put, how "zero config" is it, or rather how
   * far does the "install bili" and start work goes.
   * ... without adding other configs?
   */

  presets.push(['@babel/preset-env', createTransformOptions(targets)])

  presets.push(['bili/babel'])

  // https://github.com/lodash/babel-plugin-lodash
  plugins.push('babel-plugin-lodash')

  // Is this overwriting, or additive? rel=#ShouldWePutThis
  // plugins.push('@babel/plugin-external-helpers')  // rel=#ShouldWePutThis
  // plugins.push('@babel/plugin-transform-runtime') // ^

  /** @type {import('@types/babel__core').TransformOptions} */
  const babelTransformOptions = {
    exclude: 'node_modules/**',
    presets,
    plugins,
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            { ...createTransformOptions(targets), modules: 'cjs' },
          ],
          // ['babel-preset-jest'], // rel=#ShouldWePutThis
        ],
      },
    },
  }

  return babelTransformOptions
}
