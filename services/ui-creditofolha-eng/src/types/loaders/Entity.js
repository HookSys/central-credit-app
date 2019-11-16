// @flow
import type { TEntityInstances } from 'types/entities'

export type TEntityLoader = {
  ...TEntityInstances,
  render(): any,
}
