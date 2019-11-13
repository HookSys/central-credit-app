// @flow
import type { Store } from 'redux'

export type Redux = {
  store: Store<any, any>,
  persistor: Object,
}
