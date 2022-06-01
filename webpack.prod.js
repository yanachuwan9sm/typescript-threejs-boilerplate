const { merge } = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(commonConfiguration, {
  mode: 'production',
  // コンパイル毎に出力先フォルダ内を削除する
  // デフォルト設定 : output.pathで指定したフォルダの中身を削除
  plugins: [new CleanWebpackPlugin()],
});
