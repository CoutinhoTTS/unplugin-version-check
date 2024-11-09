export interface Position {
  top?: string | number
  bottom?: string | number
  left?: string | number
  right?: string | number
}
export interface Params {
  base: string
  time: number
  systemName: string
  position?: Position
  dir?: string
  title?: string
  describe?: string
  btnText?: string
  overlay?: boolean
}
