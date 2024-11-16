import type { UnpluginFactory } from 'unplugin'
import type { ResolvedConfig } from 'vite'
import type { Params } from './core/types'
import { resolve } from 'node:path'
import { createUnplugin } from 'unplugin'
import { core } from './core/index'

const unpluginFactory: UnpluginFactory<Params> = (params) => {
  params = Object.assign({ base: './', time: 30000, systemName: 'system' }, params)
  // const ismode = false
  return {
    name: 'unplugin-version-check',
    buildEnd() {
      const _ctx = this?.getNativeBuildContext?.()
      if (!params.dir && _ctx && 'compiler' in _ctx) {
        const path = _ctx?.compiler?.outputPath
        path && (params.dir = path)
      }
    },
    vite: {
      configResolved(config: ResolvedConfig) {
        !params?.dir && (params.dir = resolve(config.root, config.build.outDir))
      },
    },

    writeBundle() {
      core(params)
    },
  }
}

const unplugin = createUnplugin(unpluginFactory)

export default unplugin
