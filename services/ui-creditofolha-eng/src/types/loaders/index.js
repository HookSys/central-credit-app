// @flow
export type * from './Themes'
export type * from './Redux'
export type * from './Services'
export type * from './Entity'
export type * from './Permission'
export type * from './Importer'
export type * from './Cache'

export type TLoader<T> = {
  setup?: () => TLoader<T>,
  load: () => Promise<T>,
  ...Function
}
