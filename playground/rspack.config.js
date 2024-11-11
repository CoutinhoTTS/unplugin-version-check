const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const unpluginVersions = require('unplugin-version-check/rspack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/rspack'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    unpluginVersions.default({
      position: {
        bottom: '10',
        right: 10,
      },
    }),
  ],
  // 其他配置
}
