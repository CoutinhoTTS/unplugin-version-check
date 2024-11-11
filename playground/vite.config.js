import unpluginVersions from 'unplugin-version-check/vite'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      unpluginVersions({
        base: './',
        time: 30000,
        // overlay: false,
      }),
    ],
    build: {
      outDir: 'dist/vite',
    },
  }
})
