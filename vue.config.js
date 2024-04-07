const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // webpack devServer配置 ：提供了代理功能，把所有请求转发到另一个服务器上。
  devServer: {
    // 监听端口
    port: 8080,

    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // 配置反向代理
    proxy: {
      // 当地址中有/api时触发代理机制，就会转发到target指定的地址
      // 天坑!!!!!，此处位置必须和.env.development中的VUE_APP_BASE_API一致,否则代理不生效
      '/api': {
        // 要代理的地址
        // target: 'https://api.imooc-admin.lgdsunday.club/',
        // target: 'http://10.165.27.210:8000/',
        target: 'http://192.168.12.166:8000/',
        // 允许跨域
        changeOrigin: true
      }
    }
  },

  // 配置svg-sprite-loader: 把src/icons/svg中的svg文件全部打包成一个svg文件
  chainWebpack: (config) => {
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

    // 去掉浏览器警告
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },

  // 配置全局scss变量
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          errorOnUnspecifiedImports: true
        }
      }
    }
  },
  configureWebpack: {
    // 使用path-browserify代替path
    resolve: {
      fallback: {
        path: require.resolve('path-browserify')
      }
    },
    devtool: 'source-map'
  }
}
