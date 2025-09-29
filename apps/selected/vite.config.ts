import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'selected',
      filename: 'remoteEntry.js',
      exposes: {
        './SelectedPage': './src/features/selected',
      },
      shared: ['react', 'react-dom', '@teddy/design-system']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src')
    }
  }
})
