// @flow
import { DEFAULT } from 'constants/entity'
import EntityBuilder from 'app/builders/EntityBuilder'

import type { Structure, Entity, Entities, RefEntity } from 'app/types'
import type { EntityKey } from 'constants/entity'
import type { Element } from 'react'

import defaultStructure from './default'
// import companyStructure from './company'
// import employeeStructure from './employee'
// import adminStructure from './admin'

const createEntity = (id: EntityKey, structure: Structure): Entity => {
  const entity: Entity = (new Proxy({}, {
    get(target, name) {
      if (name === 'pages' && typeof target[name] === 'object') {
        return target[name].current
      }
      return target[name]
    },
  }): Entity)

  const entityRef: RefEntity = new Proxy({ current: entity }, {
    get(target, name) {
      if (name !== 'current') {
        return target.current[name]
      }
      return target[name]
    },
  })

  const entityCast = (entityRef: any)
  const { element, pages }: { element: Element<any>, pages: any } = EntityBuilder(
    structure,
    entityCast,
    id
  )

  entityRef.current['structure'] = structure
  entityRef.current['element'] = element
  entityRef.current['pages'] = pages

  return (entityRef: any)
}

const entities: Entities = {
  [DEFAULT]: createEntity(DEFAULT, defaultStructure),
}

export default entities
