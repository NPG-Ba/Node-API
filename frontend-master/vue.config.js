module.exports = {
  lintOnSave: false,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.42:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'ja',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
