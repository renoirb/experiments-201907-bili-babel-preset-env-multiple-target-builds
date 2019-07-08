/**
 * See also:
 * - https://github.com/royriojas/eslint-friendly-formatter
 * - https://github.com/jest-community/eslint-plugin-jest/releases
 */
module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
  },

  env: {
    browser: true,
    node: true,
  },

  // https://prettier.io/docs/en/eslint.html
  // https://github.com/prettier/eslint-config-prettier
  extends: [
    'prettier',
    'prettier/standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
    'plugin:lodash-fp/recommended',
  ],

  // https://github.com/xjamundx/eslint-plugin-promise
  // https://github.com/prettier/eslint-plugin-prettier
  plugins: ['promise', 'prettier'],

  rules: {
    'no-trailing-spaces': 'error',

    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],

    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],

    'array-bracket-newline': [
      'error',
      {
        multiline: true,
        minItems: 2,
      },
    ],

    'array-element-newline': [
      'error',
      {
        multiline: true,
        minItems: 2,
      },
    ],

    'object-property-newline': ['error'],

    'object-curly-newline': [
      'error',
      {
        multiline: true,
        minProperties: 1,
      },
    ],

    // Prefer const over let
    'prefer-const': [
      2,
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],

    'no-var': 2,

    // No single if in an "else" block
    'no-lonely-if': 2,

    // Force dot notation when possible
    'dot-notation': 2,

    // Force curly braces for control flow
    curly: 2,

    // No async function without await
    'require-await': 2,

    // Allow async-await
    'generator-star-spacing': 0,
  },
}
