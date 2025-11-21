import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    open: true, // Abre automaticamente o navegador
    port: 3111, // Porta do servidor de desenvolvimento
  }
})