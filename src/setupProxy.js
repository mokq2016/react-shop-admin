const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api/**', {
    target: 'http://47.107.225.70:7000/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  }))
}
