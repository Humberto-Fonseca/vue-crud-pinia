import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Configuración de Vite para el proyecto Vue 3
// Se establece la base para despliegue en GitHub Pages: /vue-crud-pinia/
export default defineConfig({
  base: '/vue-crud-pinia/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
