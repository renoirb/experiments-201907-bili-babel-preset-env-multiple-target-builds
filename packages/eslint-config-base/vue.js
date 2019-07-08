module.exports = {
  rules: {
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        multiline: 'always',
      },
    ],
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignores: ['pre', 'textarea'],
      },
    ],
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignores: ['pre', 'textarea'],
      },
    ],
  },
}
