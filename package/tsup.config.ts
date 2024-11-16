import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/*.ts'],
  format: ['cjs', 'esm'],
  target: 'node16.14',
  splitting: true,
  clean: true,
  dts: true,
  external: ['fs-extra', 'parse5', 'magic-string', 'unplugin', 'jiti'],
})
