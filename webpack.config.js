const path = require('path')
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
    // 调试工具
    devtool: 'source-map'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  }
}
