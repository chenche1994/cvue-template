const path = require('path')
const {VUE_APP_DOMAIN_BASE} = process.env
const packageName = require('./package.json').name

module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
    proxy:{
      '/common-api': {
        target: VUE_APP_DOMAIN_BASE,
        changeOrigin: true,
        pathRewrite: {
          '^/common-api': ''
        }
      },
    }
  },
  css: {
    sourceMap:process.env.NODE_ENV === 'dev' ? true :false
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
    },
    output: {
      library: packageName, // 主应用注册微应用的名称，一般同项目名保持一致
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  },
  chainWebpack: config => {
    config.module.rule('fonts').use('url-loader').loader('url-loader').options({}).end();
    config.module.rule('images').use('url-loader').loader('url-loader').options({}).end();
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    });
  }
}
