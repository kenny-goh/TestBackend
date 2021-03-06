module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'plugin:mocha/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: ['/cypress/**/*.js'],
  rules: {
    'no-unused-vars': 'off',
    'no-self-compare': 'warn',
    'mocha/no-mocha-arrows': 'warn',
    'no-restricted-syntax': 'warn',
    'guard-for-in': 'warn',
    'arrow-body-style': 'warn',
    'comma-dangle': 'warn',
    'no-unused-expressions': 'warn',
    'implicit-arrow-linebreak': 'warn',
    'node/no-unpublished-require': 'off',
    'object-curly-newline': 'off',
  },
};
