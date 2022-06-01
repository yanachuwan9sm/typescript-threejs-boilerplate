const path = require('path');
const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');

module.exports = merge(commonConfiguration, {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  devServer: {
    static: {
      watch: true,
      directory: path.join(__dirname, './dist'),
    },
    port: 8080,
    open: true,
    https: false,
    allowedHosts: 'all',
    hot: true,
    watchFiles: ['src/**', 'dist/**'],
  },
});
