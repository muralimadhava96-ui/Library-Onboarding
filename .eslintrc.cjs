module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    mocha: true
  },
  extends: ['eslint:recommended', 'plugin:lit/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {}
};
