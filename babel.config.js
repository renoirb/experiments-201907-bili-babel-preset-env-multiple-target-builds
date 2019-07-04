// THIS IS NORMALLY IMPORTED FROM ANOTHER MODULE

// https://babeljs.io/docs/en/config-files#config-function-api
module.exports = (
  /** @type {import('@types/babel__core').ConfigAPI} */ api
) => {
  api.cache(false)
  api.assertVersion('^7.2')

  const {
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
  const isBrowserBuildUgglyHack = /^build:browser:/.test(npm_lifecycle_event)

  // https://new.babeljs.io/docs/en/next/babel-preset-env.html#targets
  const targets = {}
  if (isBrowserBuildUgglyHack) {
    // https://github.com/browserslist/browserslist
    targets.browsers = [`last 2 versions`, 'ie >= 10']
  } else {
    targets.node = 10
  }
  // ===== /CREATE MULTIPLE TARGET BUILD ======

  const envName = api.envName

  console.log(
    `\n${npm_lifecycle_event}`,
    { envName, targets: { ...targets } },
    `\n`
  )

  // At https://github.com/egoist/bili/blob/master/src/index.ts#L158
  // If we put a log, we can see the target value.
  // console.log('bili createRollupConfig config.output.target', config.output.target)

  const presets = [
    [
      // https://new.babeljs.io/docs/en/next/babel-preset-env.html
      // https://babeljs.io/docs/en/babel-preset-env
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.1.4', // match with root's core-js package version!
        shippedProposals: true,
        debug: true,
        targets,
        modules: false,
      },
    ],
  ]

  const plugins = [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-external-helpers',
    // https://github.com/lodash/babel-plugin-lodash
    'babel-plugin-lodash',
  ]

  /** @type {import('@types/babel__core').TransformOptions} */
  return {
    exclude: 'node_modules/**' /* only transpile our source code */,
    presets,
    plugins,
    env: {
      test: {
        presets: [['@babel/preset-env', { modules: 'cjs' }]],
      },
      build: {
        presets: [['@babel/preset-env', { modules: false }]],
      },
    },
  }
}
