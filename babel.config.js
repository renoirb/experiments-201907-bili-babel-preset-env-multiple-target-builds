// THIS IS NORMALLY IMPORTED FROM ANOTHER MODULE

// .browserslistrc??
const browsersList = Object.freeze([`last 2 versions`, 'ie >= 10'])

// #WIP
const createTargets = (
  environment = 'development',
  nodeVersion = 10,
  browsers,
  npm_lifecycle_event = 'dusting'
) => {
  const isBrowserBuildUgglyHack = /^build:browser:/.test(npm_lifecycle_event)
  const isTest = /^test$/i.test(environment)

  // https://new.babeljs.io/docs/en/next/babel-preset-env.html#targets
  let targets = {
    node: Number(nodeVersion),
    browsers: [...browsers],
  }

  if (!isBrowserBuildUgglyHack || isTest) {
    delete targets.browsers
  }
  // ===== /CREATE MULTIPLE TARGET BUILD ======

  return targets
}

// https://babeljs.io/docs/en/config-files#config-function-api
module.exports = function babelConfig(
  /** @type {import('@types/babel__core').ConfigAPI} */ api
) {
  /**
   * ლ(ಠ益ಠ)ლ
   *
   * Y U NO(t) work!
   *
   * This'll work, some day.
   */
  api.cache(false)
  api.assertVersion('^7.2')

  // Normally make this dynamic #WIP
  const {
    PROJECT_ENV_NODE_VERSION = 10,
    NODE_ENV = 'tropical',
    DEBUG = '', // e.g. '*,-babel'

    /**
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
  } = process.env

  const nodeEnv = NODE_ENV // api.env() // <<-- └(՞▃՞ └)

  // #WIP
  const targets = createTargets(
    nodeEnv,
    PROJECT_ENV_NODE_VERSION,
    browsersList,
    npm_lifecycle_event
  )

  if (String(DEBUG).length > 0) {
    console.log('babel.config', {
      targets: JSON.parse(JSON.stringify(targets)),
      npm_lifecycle_event,
      nodeEnv,
    })
    // console.log('process.env', process.env)
  }

  // At https://github.com/egoist/bili/blob/master/src/index.ts#L158
  // If we put a log, we can see the target value.
  // console.log('bili createRollupConfig config.output.target', config.output.target)

  /** @type {import('@types/babel__core').TransformOptions} */
  const babelPresetEnv = {
    // https://new.babeljs.io/docs/en/next/babel-preset-env.html
    targets,
    debug: true,
    // BEGIN rel=#ShouldWePutThis
    loose: true,
    corejs: '3.1.4', // match with root's core-js package version!
    modules: 'auto',
    shippedProposals: true,
    useBuiltIns: 'usage',
    // END rel=#ShouldWePutThis
  }

  const presets = [
    [
      // https://new.babeljs.io/docs/en/next/babel-preset-env.html
      // https://babeljs.io/docs/en/babel-preset-env
      '@babel/preset-env',
      babelPresetEnv,
    ],
  ]

  // Is this overwriting, or additive?
  const plugins = [
    '@babel/plugin-transform-runtime',
    // BEGIN rel=#ShouldWePutThis
    // '@babel/plugin-external-helpers',
    // '@babel/plugin-transform-async-to-generator',
    // '@babel/plugin-transform-regenerator',
    // '@babel/plugin-transform-arrow-functions',
    // '@babel/plugin-proposal-export-default-from',
    // '@babel/plugin-proposal-async-generator-functions',
    // END rel=#ShouldWePutThis
    // https://github.com/lodash/babel-plugin-lodash
    'babel-plugin-lodash',
  ]

  /** @type {import('@types/babel__core').TransformOptions} */
  return {
    // exclude: 'node_modules/**' /* only transpile our source code */,
    // ------ THIS IS WHERE IT IS GETTING FUNKY ------
    presets,
    plugins,
    env: {
      test: {
        presets: [
          // 'babel-preset-jest', // rel=#ShouldWePutThis
          ['@babel/preset-env', { ...babelPresetEnv, modules: 'cjs' }],
        ],
      },
      build: {
        presets: [
          ['@babel/preset-env', { ...babelPresetEnv, modules: 'auto' }],
        ],
      },
    },
    // ------ /THIS IS WHERE IT IS GETTING FUNKY ------
  }
}
