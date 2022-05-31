const path = require("path");
const dotenv = require("dotenv");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 未導入
const CopyPlugin = require("copy-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { optimizeImage } = require("./.squooshrc");

dotenv.config();

const mode = process.env.NODE_ENV;

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = mode === "development";

const config = {
  mode: mode,
  context: path.join(__dirname, "src"),
  entry: `./js/index.js`,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },

  module: {
    rules: [
      {
        test: [/\.js$/],
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false, // ESモジュールを保持する
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          // CSSファイルを書き出すオプションを有効にする
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false, // CSS内のurl()は無効となり、画像は読み込まれない
              sourceMap: enabledSourceMap, // ソースマップを有効にする
            },
          },
          {
            // SCSS を CSS に変換
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 画像をBase64として取り込む
        type: "asset/inline",
      },
    ],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
  plugins: [
    new StylelintPlugin({
      configFile: path.resolve(__dirname, ".stylelintrc.js"),
    }),
    new ESLintPlugin({
      extensions: [".js"],
      exclude: "node_modules",
    }),
    // コンパイル毎に出力先フォルダ内を削除する
    // デフォルト設定 : output.pathで指定したフォルダの中身を削除
    new CleanWebpackPlugin(),

    new BrowserSyncPlugin({
      host: process.env.WEBPACK_BROWSER_SYNC_HOST || "localhost",
      port: process.env.WEBPACK_BROWSER_SYNC_PORT || 3000,
      proxy: process.env.WEBPACK_BROWSER_SYNC_PROXY || false,
      server: process.env.WEBPACK_BROWSER_SYNC_PROXY ? false : distRelativePath,
      open: false,
      files: [distRelativePath],
      injectChanges: true,
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, `${srcRelativePath}/assets/images`),
          to: "images/[name][ext]",
          noErrorOnMissing: true,
          transform: {
            transformer:
              mode === "production" ? optimizeImage : (content) => content,
          },
        },
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [
        {
          test: /\.(jpe?g|png)$/i,
          options: {
            quality: 60,
          },
        },
      ],
    }),
    // CSSファイルを外だしにするプラグイン
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
};

if (mode === "development") {
  config.devtool = "source-map";
}

module.exports = config;
