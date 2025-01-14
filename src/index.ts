import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'
import { transformCode } from './core'

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name: 'unplugin-nullish-coalescing-operator',
  enforce: 'pre',
  transformInclude(id) {
    if (options) {
      const { fileNames } = options
      if (fileNames) {
        if (typeof fileNames === 'string')
          return id.includes(fileNames)

        if (Array.isArray(fileNames))
          return fileNames.findIndex(name => id.includes(name)) !== -1
      }
    }
    return id.includes('.ts') || id.includes('.vue')
  },
  transform(code, id) {
    return transformCode(code, id.includes('.vue'))
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
