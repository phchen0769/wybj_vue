import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 服务器监听的地址和端口
    host: '0.0.0.0',
    port: 8080
  },
  plugins: [
    vue(),
    {
      name: 'process',
      transform(code) {
        return code.replace(/process\.env/g, 'import.meta.env')
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
