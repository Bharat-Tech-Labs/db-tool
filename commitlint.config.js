const lernaScopesConfig = require('@commitlint/config-lerna-scopes');

const scopes = [
  'release',
  'tooling',
  'root',
  'lambda'
];

const getScopes = (initialEnum = []) => (context) => lernaScopesConfig.utils
  .getPackages()
  .then((packageList) => initialEnum.concat(packageList))
  .then((scopeList) => [
    2,
    'always',
    scopeList
  ]);

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': (context) => getScopes(scopes)(context)
  }
};