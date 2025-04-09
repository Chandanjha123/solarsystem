import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['6df1-2409-40e0-3e-8f74-96-f33c-b9b9-95c0.ngrok-free.app'],
  },
})
