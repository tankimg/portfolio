import { defineConfig } from "vite";
const { resolve } = require('path')

export default defineConfig({
    build:{
        chunkSizeWarningLimit: 800
    },
    base: './'
});

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