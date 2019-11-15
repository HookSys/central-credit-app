// @flow
import type { TEntityInstances } from 'app/entities/types'

export type Entity = {
  ...TEntityInstances,
  render(): any,
}
