module.exports = {
  devServer: {
    port: 7071,
    disableHostCheck: true,
    proxy: {
      '/ws': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/ws': '' }
      },
    }
  }
}
