import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['67a9-2409-40e0-1041-4ba0-90d4-6251-208a-fbe0.ngrok-free.app '],
  },
})
