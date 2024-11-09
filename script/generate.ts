import fs from 'fs-extra'
import { ModuleKind, transpileModule } from 'typescript'

const tsCode = fs.readFileSync('./src/core/check.ts', 'utf-8')
const result = transpileModule(tsCode, {
  compilerOptions: { module: ModuleKind.ESNext },
})
fs.writeFileSync(
  './src/core/generate/js.ts',
  `export default \`${result.outputText}\``,
)
