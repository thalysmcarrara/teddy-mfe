import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig.build.json' })
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'TeddyDesignSystem',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    },
    sourcemap: true
  }
})
