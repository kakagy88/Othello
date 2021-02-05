/**
 * webpack
 */

const webpack = require('webpack')
const path = require('path')
// *************************************
// webpack plugin
// *************************************
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// 環境変数
const NODE_ENV = process.env.NODE_ENV || 'production'
const IS_DEVSERVER = !!(process.env.IS_DEVSERVER)
const PORT = process.env.PORT || '9999'
const SRC = path.resolve(__dirname, 'src')
const DIST = path.resolve(__dirname, 'dist')
const config = require('./config')

console.log(`*****************************`)
console.log(`*** NODE_ENV: ${ NODE_ENV }`)
console.log(`*** IS_DEVSERVER: ${ IS_DEVSERVER }`)
if (IS_DEVSERVER) {
  console.log(`*** http://localhost:${ PORT }`)
}
console.log(`*****************************`)

module.exports = {
  mode: NODE_ENV,

  devtool: NODE_ENV === 'production'
    ? false
    : 'cheap-module-eval-source-map'
  ,
  // devtool: 'source-map',

  entry: IS_DEVSERVER
    ? [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${ PORT }`,
        'webpack/hot/only-dev-server',
        `${ SRC }/index.js`,
      ]
    : {
        'bundle': `${ SRC }/index.js`
      },

  output: {
    path: DIST,
    publicPath: IS_DEVSERVER ? '/' : '',
    filename: IS_DEVSERVER ? 'bundle.js' : '[name].js?[chunkhash]',
    globalObject: IS_DEVSERVER ? 'self' : 'window',
  },
  // Entrypoint mini-css-extract-plugin = *対応
  stats: {
    entrypoints: false,
    children: false
  },

  resolve: {
    alias: [],
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss|.css$/,
        use: [
          IS_DEVSERVER ? 'style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `${ SRC }/index.html`,
      inject: 'body',
      filename: `index.html`,
      chunksSortMode: 'dependency'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.ROOT': JSON.stringify(config[NODE_ENV].root),
      'process.env.IS_DEVSERVER': IS_DEVSERVER
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEVSERVER ? '[name].css?[hash]' : '[name].css'
    }),
  ],

  devServer: {
    contentBase: DIST,
    historyApiFallback: true,
    host: 'localhost',
    port: PORT,
    inline: true,
    hot: true,
    disableHostCheck: true
  },

  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          }
        }
      })
    ]
  },

  performance: {
    hints: false
  }
}
