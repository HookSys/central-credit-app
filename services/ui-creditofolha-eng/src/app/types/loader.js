// @flow
export type Loader<T> = {
  setup?: () => Loader<T>,
  load: () => Promise<T>,
  ...Function
}
