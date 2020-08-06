import baseConfig from '../.eslintrc.js';

const settings = {
  ...baseConfig.settings
};

module.exports = { ...baseConfig, ...{ settings } };