'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://127.0.0.1:8888"',
  API_FLAGSTRING: '"-dev"',
  IMG_URL: '"http://xxxxxx.xxx.xx"',
});
