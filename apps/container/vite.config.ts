import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const customersRemote = env.VITE_CUSTOMERS_URL || 'http://localhost:5001/assets/remoteEntry.js'
  return {
    plugins: [
      react(),
      federation({
        name: 'container',
        remotes: {
          customers: customersRemote
        },
        shared: ['react', 'react-dom', '@teddy/design-system']
      })
    ],
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
  }
})
