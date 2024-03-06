const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// 组件中的svg文件全部打包成一个svg文件
module.exports = {
  // webpack devServer配置 ：提供了代理功能，把所有请求转发到另一个服务器上。
  devServer: {
    proxy: {
      // 当地址中有/api时，就会转发到http://api.imooc-admin.lgdsunday.club/
      '/api': {
        target: 'http://api.imooc-admin.lgdsunday.club/',
        // 允许跨域
        changeOrigin: true
      }
    }
  },

  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
