// @flow
import { EEntityKeys } from 'constants/entity'
import type { TEntityKeys } from 'constants/entity'

import EntityBuilder from 'app/builders/EntityBuilder'

import type { TEntity, TEntityInstance, TEntityInstances } from 'app/entities/types'

import DefaultEntity from './default'

function createEntityInstance(entity: TEntity, id: TEntityKeys): TEntityInstance {
  const element = EntityBuilder(entity, id)
  return {
    id,
    entity,
    element,
  }
}

const Entities: TEntityInstances = {
  [EEntityKeys.DEFAULT]: createEntityInstance(DefaultEntity, EEntityKeys.DEFAULT),
}


export default Entities
