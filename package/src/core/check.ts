interface Option {
  systemName: string
  time: number
}
class _CheckVersion {
  version_key: string
  current_version: string | undefined
  version_value: string
  checkVersionInterval: number | NodeJS.Timeout
  time = 30000
  dialog: HTMLDialogElement
  constructor(option: Option) {
    this.version_key = `${option.systemName}_version`
    this.time = option.time || 30000
  }

  async check(bool: boolean = false) {
    this.current_version = localStorage.getItem(this.version_key) || void 0
    const data = await fetch(`./version?key=${Date.now()}`)
    this.version_value = await data.text()
    if (!this.version_value)
      return
    if (!this.current_version) {
      localStorage.setItem(this.version_key, this.version_value)
      return
    }
    if (this.current_version === this.version_value)
      return
    if (bool) {
      localStorage.setItem(this.version_key, this.version_value)
      location.reload()
      return
    }
    if (this.dialog && 'showModal' in this.dialog) {
      this.dialog.showModal()
      clearInterval(this.checkVersionInterval)
    }
  }

  hideDialog() {
    this.dialog && this.dialog.close()
    this.checkVersionInterval = setInterval(() => {
      this.check()
    }, this.time)
  }

  refreshVersion() {
    this.hideDialog()
    localStorage.setItem(this.version_key, this.version_value)
    window.location.reload()
  }

  startCheck() {
    !this.dialog && (this.dialog = document.querySelector(`dialog.version-check-dialog`) as HTMLDialogElement)
    if (!this.dialog)
      return
    this.check(true)
    const closeBtn = document.querySelector(`dialog.version-check-dialog #version-tips_close`)
    closeBtn?.addEventListener('click', this.hideDialog.bind(this))
    const refreshBtn = document.querySelector(`dialog.version-check-dialog #version-dialog-button-confirm`)
    refreshBtn?.addEventListener('click', this.refreshVersion.bind(this))
    this.checkVersionInterval = setInterval(() => {
      this.check()
    }, this.time)
  }
}
