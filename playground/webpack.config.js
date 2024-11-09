const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const unpluginVersions = require('unplugin-check-version/webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'webpack'),
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
