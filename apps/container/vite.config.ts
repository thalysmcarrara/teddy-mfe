import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'container',
      remotes: {
        customers: 'http://localhost:5001/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', '@teddy/design-system']
    })
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src')
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
