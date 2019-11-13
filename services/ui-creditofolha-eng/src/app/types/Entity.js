// @flow
import type { Element } from 'react'
import type { EntityKey } from 'constants/entity'
import type { Structure, StructurePages } from './Structure'

export type Entity = {
  structure: Structure,
  element: Element<any>,
  pages: StructurePages,
}

export type RefEntity = { current: Entity }

export type Entities = {
  [key: EntityKey]: Entity,
}

export type EntityManager = {
  ...Entities,
  render(): Element<any>,
}
