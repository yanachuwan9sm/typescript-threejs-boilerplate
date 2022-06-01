# typescript-threejs-boilerplate

## Webpackをベースにした、 Three.jsの開発環境ボイラープレート


- css/JavaScriptのビルド
- css/JavaScriptの構文チェック
- ローカルホストの立ち上げ

- 画像の圧縮/webp変換 (未対応)
- JavaScript 及び TypeScript のビルド・構文チェックに対応 (未対応)
- 汎用的なThreejsの処理やライブラリの事前読み込み (未対応)

## Start

### 1
```
npm install
```

### 2
```
npm run dev
```

## Script

  ```
  "build": "webpack --config webpack.prod.js",
  "dev": "webpack serve --config webpack.dev.js",
  "lint": "eslint 'src/js/**/*.js'",
  "lint:fix": "eslint --fix 'src/js/**/*.js'",
  "stylelint": "stylelint 'src/scss/**/*.scss'",
  "stylelint:fix": "stylelint --fix 'src/scss/**/*.scss'"
  
  ```
  
  
