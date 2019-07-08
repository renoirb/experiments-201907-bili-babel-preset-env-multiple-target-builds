module.exports = {
  env: {
    jest: true,
  },
  // https://github.com/jest-community/eslint-plugin-jest
  plugins: ['eslint-plugin-jest'],
  extends: ['plugin:jest/recommended'],
  globals: {
    describe: true,
    beforeAll: true,
    afterAll: true,
    beforeEach: true,
    afterEach: true,
    test: true,
    it: true,
    expect: true,
  },
}
