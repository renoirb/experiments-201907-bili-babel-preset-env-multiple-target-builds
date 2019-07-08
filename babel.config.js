const {
  utils: { babelPresetEnvMergeTransformOptions },
} = require('@bindings/packaging-and-testing')

module.exports = {
  presets: [
    /**
     * Question: How can we add to @babel/preset-env, why can't we do it from here?
     *
     * Should we add @babel/preset-env again? Before? After?
     *
     * I was thinking we could extend @babel/preset-env from here since it feels like it's meant for extending it.
     */
    [
      'bili/babel',
      // context (next line) can be passed here
      // https://github.com/egoist/bili/blob/master/src/babel/preset.ts#L6
      {
        /* ignored? */
      },
    ],
    [
      '@babel/preset-env',
      babelPresetEnvMergeTransformOptions({
        debug: true,
        shippedProposals: true,
        // https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
        // https://babeljs.io/docs/en/babel-preset-env#targets
        targets: {
          // Instead of .browserslistrc
          browsers: 'ie >= 10, > 0.25%, not dead',
          node: '10',
        },
      }),
    ],
  ],
  plugins: [['babel-plugin-lodash']],
  env: {
    /**
     * Question: What is the proper way of leveraging babel environments from within bili?
     * For example, we have a "ssr" BABEL_ENV step for when we know we're bundling for server-side renderer (let's say)
     * Should we set environment `export BABEL_ENV=ssr` before running bili so we can manage more than one @babel/preset-env?
     */
    test: {
      // Jest does it for testing, that's all good.
      presets: [
        ['babel-preset-jest'],
        [
          '@babel/preset-env',
          babelPresetEnvMergeTransformOptions({
            modules: 'auto',
          }),
        ],
      ],
    },
    ssr: {
      // But, how else? Where to look?
      presets: [
        [
          '@babel/preset-env',
          babelPresetEnvMergeTransformOptions({
            modules: 'auto',
          }),
        ],
      ],
    },
  },
}
