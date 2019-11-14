const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ROOT = path.resolve(__dirname, 'src')
const DESTINATION = path.resolve(__dirname, 'dist')

module.exports = {
  context: ROOT,

  entry: {
    [pkg.name]: './main.ts'
  },

  output: {
    library: ['xdmlShared', pkg.name],
    libraryTarget: 'umd',
    filename: `[name]-${pkg.version}.js`,
    path: DESTINATION
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      ROOT,
      'node_modules'
    ]
  },

  module: {
    rules: [
      /****************
       * PRE-LOADERS
       *****************/
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'tslint-loader'
      },

      /****************
       * LOADERS
       *****************/
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()],
  devtool: 'cheap-module-source-map',
  devServer: {}
}

