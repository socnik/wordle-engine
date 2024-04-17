import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export function toAbsolutePath(relativePath: string) {
  return fileURLToPath(join(dirname(import.meta.url), relativePath))
}

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
  },
  resolve: {
    alias: {
      '@': toAbsolutePath('./src'),
    },
  },
})
