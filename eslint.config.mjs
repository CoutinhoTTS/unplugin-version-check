// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  "rules": {
    "regexp/no-unused-capturing-group": "off"
  }
})
