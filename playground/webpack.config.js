const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const unpluginVersions = require('unplugin-version-check/webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/webpack'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    unpluginVersions.default({
      base: './',
      time: 30000,
      overlay: false,
      position: {
        top: '10px',
        left: '100px',
      },
    }),
  ],
  // 其他配置
}
