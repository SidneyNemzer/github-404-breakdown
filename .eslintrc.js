module.exports = {
  extends: 'standard',
  env: { browser: true },
  plugins: [
    'standard',
    'promise'
  ],
  rules: {
    'valid-typeof': 'off',
    'spaced-comment': 'off',
    'space-in-parens': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'operator-linebreak': [
      'error',
      'before',
      {
        overrides: {
          '=': 'after'
        }
      }
    ]
  }
}
