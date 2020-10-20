module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
        target: process.env.BASE_URL || process.env.VUE_APP_BASE_API,
        secure: false,
        changeOrigin: true
      },
      '/uploads/*': {
        target: process.env.BASE_URL || process.env.VUE_APP_BASE_API,
        secure: false,
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/_variables.scss";
        `
      }
    }
  }
}
