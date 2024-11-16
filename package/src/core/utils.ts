import type { DefaultTreeAdapterMap } from 'parse5'
import type { Background, Position } from './types'
import jsContent from './generate/js'

type Node = DefaultTreeAdapterMap['node']
interface CssConfig {
  position?: Position
  overlay?: boolean
  background?: Background

}
export function generateVersion() {
  const today = new Date()
  const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '')
  const timestamp = Date.now()
  const randomNumber = `${formattedDate}${timestamp}`
  return randomNumber
}

export function traverse(node: Node, callback: (node: Node) => void) {
  callback(node)
  if ('childNodes' in node && node.childNodes) {
    node.childNodes.forEach(child => traverse(child, callback))
  }
}

function addUnit(value: number | string) {
  if (typeof value === 'number') {
    return `${value}px`
  }
  const regex = /^\d+(\.\d+)?(px|em|rem|%|vw|vh|pt|cm|mm|in|pc)$/
  if (regex.test(value))
    return value
  return `${value}px`
}

export function generateHtml({ title = 'Discover new version', describe = 'Detected a new version of the system, please update!', btnText = 'Update now', version = '000' } = {}) {
  return `
     <dialog data-v-${version} class="version-check-dialog" >
          <div data-v-${version} class="version-dialog-body tips">
              <div data-v-${version} class="version-tips">
                  ${title}
              </div>
              <span data-v-${version} class="version-tips_describe">
                  ${describe}
              </span>
              <svg data-v-${version} id="version-tips_close" class="version-tips_close" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m7 7l10 10M7 17L17 7" />
              </svg>
          </div>
          <div data-v-${version} class="version-dialog-footer">
              <button data-v-${version} id="version-dialog-button-confirm" class="version-dialog-button-primary"
                  onclick="funi_refreshVersion()">${btnText}</button>
          </div>
      </dialog>
    `
}

export function generateCss(prop: string, cssConfig: CssConfig) {
  const position = {
    top: cssConfig?.position?.top ?? void 0,
    bottom: cssConfig?.position?.bottom ?? void 0,
    left: cssConfig?.position?.left ?? void 0,
    right: cssConfig?.position?.right ?? void 0,
  }
  const overlay = cssConfig?.overlay ?? true
  const background = cssConfig?.background
  const backgroundCss: string[] = []
  if (typeof background === 'object' && Object.keys(background).length) {
    Object.keys(background).forEach((key) => {
      backgroundCss.push(`background-${key}:${background[key]}`)
    })
  }
  return `
         .version-check-dialog[${prop}] {
            width: 350px;
            height: 160px;
            border: none;
            border-radius: 10px;
            box-shadow: 0px 16px 48px 16px rgba(0, 0, 0, .08), 0px 12px 32px rgba(0, 0, 0, .12), 0px 8px 16px -8px rgba(0, 0, 0, .16);
            box-sizing: border-box;
            padding: 0;
            overflow: hidden;
            ${position.top ? `margin-top:${addUnit(position.top)};` : ''}
            ${position.bottom ? `margin-bottom:${addUnit(position.bottom)};` : ''}
            ${position.left ? `margin-left:${addUnit(position.left)};` : ''}
            ${position.right ? `margin-right:${addUnit(position.right)};` : ''}
        }
       .version-check-dialog[${prop}]>div {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
            .version-check-dialog[${prop}]>.version-dialog-body.tips {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            height: 115px;
            gap: 15px;
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
            padding: 0 20px;
            ${backgroundCss.join(';')}

        }

         .version-check-dialog[${prop}]>.version-dialog-body.tips>.version-tips {
            color: rgba(48, 49, 51, 1);
            font-size: 1.5em;
            position: relative;
        }

       
        .version-check-dialog[${prop}]>.version-dialog-body.tips> .version-tips_close {
            position: absolute;
            top: 20px;
            right: 20px;
        }

         .version-check-dialog[${prop}]>.version-dialog-body.tips>.version-tips_describe {
            color: rgba(144, 147, 153, 1);
            font-size: 0.5em;
        }

        .version-check-dialog[${prop}]>.version-dialog-footer {
            box-sizing: border-box;
            height: 45px;
            border-top: 1px solid var(--el-color-info-light-9, #f2f2f4);
            display: flex;
            flex-direction: row;
            justify-content: end;
            align-items: center;
            padding: 10px;
        }

        .version-check-dialog[${prop}]>.version-dialog-footer>button {
            padding: 6px 8px;
            border-radius: 3px;
            cursor: pointer;
            line-height: 1em;
        }
        .version-check-dialog[${prop}]>.version-dialog-footer>button.version-dialog-button-primary {
            background: #007fff;
            border: 1px solid #007fff;
            color: #ffffff;
        }
        ${overlay
          ? ''
          : `dialog.version-check-dialog[${prop}]::backdrop {
           pointer-events: none;
           background-color: transparent;
        }`}
        
    `
}

export function generateJs({ systemName, time }: { systemName: string|(()=>string), time: number }) {
  
  return `
      ${jsContent}
      window.onload = function () {let systemName=${typeof systemName ==="string"?`"${systemName}"`:systemName};if(typeof systemName ==="function"){systemName=systemName()};const check = new _CheckVersion({time:${time},systemName:systemName});check.startCheck()};
    `
}
