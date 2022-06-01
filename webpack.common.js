const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: `./js/index.js`,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ['web', 'es5'],
  plugins: [
    new StylelintPlugin({
      configFile: path.resolve(__dirname, '.stylelintrc.js'),
    }),
    new ESLintPlugin({
      extensions: ['.js'],
      exclude: 'node_modules',
    }),
    new HtmlWebpackPlugin({
      template: './html/index.html',
    }),
    // CSSファイルを外だしにするプラグイン
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // SCSS
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      // JavaScript
      {
        test: [/\.js$/],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false, // ESモジュールを保持する
                  },
                ],
              ],
            },
          },
        ],
      },
      // Images
      {
        test: /\.(gif|png|jpg|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext]',
        },
      },
    ],
  },
};
