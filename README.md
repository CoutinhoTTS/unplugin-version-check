<p align="center">
  <img src="https://coutinhotts.github.io/assets/unplugin-version-check/logo.png" width="600px" />
</p>

<h1 align="center">unplugin-version-check</h1>
<p align="center">
  <a href="https://npmjs.com/package/unplugin-version-check">
    <img src="https://img.shields.io/npm/v/unplugin-version-check" alt="NPM version">
  </a>
</p>

<p align="center">
Project version check
</p>

## Why
When we are using a website and a new version is released, we need to notify the user that a new version of the site is available. Our project might be built with different frameworks and build tools, with common ones including Vite, Webpack, and Repack. We can install a plugin during the build process that supports various build tools, making it easier for the site to detect version updates.

## Install

```
npm i -D unplugin-version-check 
```

## Support

| type                                | status |
| ----------------------------------- | ------- |
|  <img src="https://coutinhotts.github.io/assets/unplugin-version-check/vite.png" width="20"> vite                                | ✅      |
|<img src="https://coutinhotts.github.io/assets/unplugin-version-check/webpack.png" width="20"> webpack                             | ✅      |
| <img src="https://assets.rspack.dev/rspack/rspack-logo.svg" width="20"  alt="Rspack"> rspack                          | ✅      |


## Use


### vite
vite.config.js
``` javascript
import versionCheck from 'unplugin-check-version/vite'
export default {
    plugins:[versionCheck(/*option*/)]
}
```
### webpack
webpack.config.js
``` javascript
const versionCheck = require('unplugin-check-version/webpack')
module.exports = {
    plugins:[versionCheck(/*option*/)]
}
```

### rspack
rspack.config.js
``` javascript
const versionCheck = require('unplugin-check-version/rspack')
module.exports = {
    plugins:[versionCheck(/*option*/)]
}
```

## Option
``` typescript
interface Position {
  top?: string | number
  bottom?: string | number
  left?: string | number
  right?: string | number
}
```
| Name | Description |Type|Default|
| -----|-------------|----|-------|
| systemName|system name|string|systemName |
| time|Interval trigger time|number|30000 |
| position|dialog location|Position|--|
| title|dialog title|string|Discover new version|
| describe|dialog describe|string|Detected a new version of the system, please update!|
| describe|dialog button text|string|Update now|
