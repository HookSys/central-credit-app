// @flow
import type { TEntityInstances } from 'app/types/entities'

export type TEntityLoader = {
  ...TEntityInstances,
  render(): any,
}
