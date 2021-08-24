const path = require('path')
const {VUE_APP_DOMAIN_BASE} = process.env

module.exports = {
  devServer: {
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
