const webpack = require('webpack')
const babel = require('./rules/babel')
const vue = require('./rules/vue')
const css = require('./rules/css')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist'),
    filename: 'vue-progressive-image.js'
  },
  module: {
    rules: [babel, vue, css]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
