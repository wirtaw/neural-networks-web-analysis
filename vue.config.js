module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/neural_networks'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/index.scss";`
      }
    }
  }
}
