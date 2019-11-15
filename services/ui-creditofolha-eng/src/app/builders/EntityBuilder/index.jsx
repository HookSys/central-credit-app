// @flow
import React from 'react'

import EntityEntryBuilder from 'app/builders/EntityEntryBuilder'
import RoutesBuilder from 'app/builders/RoutesBuilder'

import type { TEntityKeys } from 'constants/entity'
import type { TEntity, TEntityElementType } from 'app/types'
import type { Element } from 'react'

function EntityBuilder(entity: TEntity, id: TEntityKeys): Element<TEntityElementType> {
  const { entry, entry: { routes } } = entity

  const element: Element<TEntityElementType> = (
    <EntityEntryBuilder
      entity={ entity }
      key={ id }
    >
      { RoutesBuilder({
        parent: entry,
        rootPath: '',
        routes,
        entity,
        id,
      }) }
    </EntityEntryBuilder>
  )

  return element
}

export default EntityBuilder
