import type { Params } from './types'
import { join } from 'node:path'
import fs from 'fs-extra'
import MagicString from 'magic-string'
import * as parse5 from 'parse5'
import { generateCss, generateHtml, generateJs, generateVersion, traverse } from './utils'

export async function core(params: Params) {
  const dir = params?.dir
  if (!dir)
    return

  const { overlay, position, systemName, time, background } = params

  const version = generateVersion()
  fs.writeFileSync(
    join(dir, 'version'),
    version,
  )
  fs.writeFileSync(
    join(dir, `version_dialog_${version}.css`),
    generateCss(`data-v-${version}`, {
      position,
      overlay,
      background,
    }),
  )

  fs.writeFileSync(
    join(dir, `check_version_${version}.js`),
    generateJs({
      systemName,
      time,
    }),
  )

  const str = fs.readFileSync(join(dir, 'index.html'), 'utf-8')

  const ast = parse5.parse(str, {
    sourceCodeLocationInfo: true,
  })
  const s = new MagicString(str)
  const flags = {
    script: false,
    html: false,
    css: false,
  }
  traverse(ast, (node) => {
    if (node.nodeName === 'script' && !flags.script && node.sourceCodeLocation) {
      flags.script = true
      s.appendLeft(node.sourceCodeLocation.startOffset, `    <script src="${params.base}check_version_${version}.js"></script>\n`)
    }
    if (node.nodeName === 'body' && !flags.html && node.sourceCodeLocation) {
      flags.html = true
      const { title, describe, btnText } = params
      s.appendLeft(node.sourceCodeLocation.endOffset - 7, generateHtml({
        title,
        describe,
        btnText,
        version,
      }))
    }
    if (node.nodeName === 'head' && !flags.css && node.sourceCodeLocation) {
      flags.css = true
      s.appendLeft(node.sourceCodeLocation.endOffset - 7, `    <link rel="stylesheet" href="${params.base}version_dialog_${version}.css">\n`)
    }
  })
  fs.writeFileSync(join(dir, 'index.html'), s.toString())
}
