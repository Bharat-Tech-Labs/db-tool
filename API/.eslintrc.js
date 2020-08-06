const baseConfig = require('../.eslintrc.js');

const settings = {
  ...baseConfig.settings
};

module.exports = { ...baseConfig, ...{ settings } };