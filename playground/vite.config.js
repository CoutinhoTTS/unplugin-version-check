import unpluginVersions from 'unplugin-check-version/vite'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      unpluginVersions({
        base: './',
        time: 30000,
        overlay: false,
      }),
    ],
    build: {
      outDir: 'vite',
    },
  }
})
