// @flow
import React from 'react'

import StructureBuilder from 'app/builders/StructureBuilder'
import RoutesBuilder from 'app/builders/RoutesBuilder'

import type { Structure, RefStructurePages, Entity } from 'app/types'
import type { EntityKey } from 'constants/entity'
import type { Element } from 'react'

type EntityBuilderType = (structure: Structure, entity: Entity, id: EntityKey) => {
  element: Element<any>,
  pages: RefStructurePages
}

const EntityBuilder: EntityBuilderType = (structure, entity, id) => {
  const pages: RefStructurePages = { current: {} }

  const element: Element<any> = (
    <StructureBuilder structure={ structure } key={ id }>
      <RoutesBuilder
        rootPath=''
        rootKey=''
        routes={ structure.routes }
        structure={ structure }
        pages={ pages }
        entity={ entity }
      />
    </StructureBuilder>
  )

  return {
    element,
    pages,
  }
}

export default EntityBuilder
