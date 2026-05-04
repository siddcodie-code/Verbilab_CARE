import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,

    // ── Proxy all /api/* requests to the Flask backend ──────────────────────
    // This eliminates CORS issues during development.
    // The browser sends to localhost:5173/api/... 
    // Vite transparently forwards to localhost:5000/api/...
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Optional: log proxied requests in terminal
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('[Vite Proxy] Error:', err.message)
            console.error('  → Make sure Flask backend is running: python app.py')
          })
          proxy.on('proxyReq', (_, req) => {
            console.log('[Vite Proxy] →', req.method, req.url)
          })
        },
      },
    },
  },
})