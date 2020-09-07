module.exports = {
  css: {
    loaderOptions: {
      scss: {
        data: `
          @import "@/scss/all.scss";
        `
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/hotel-reservation' : '/'
};