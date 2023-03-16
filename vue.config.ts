import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

module.exports = {
    build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            en: resolve(__dirname, 'en/index.html')
          }
        }
      }
}