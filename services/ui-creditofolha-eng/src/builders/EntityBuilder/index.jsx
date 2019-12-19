// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { EEntityTypes } from 'constants/entity'

import RoutesBuilder from 'builders/RoutesBuilder'
import Permissions from 'components/Permissions'
import ThemeRender from 'components/ThemeRender'

import type { TEntityKeys } from 'constants/entity'
import type { TRoute, TEntity, TEntityInstance } from 'types'

function EntityBuilder(entity: TEntity, id: TEntityKeys): TEntityInstance {
  const { route, permissions, theme, routes, component: Container } = entity
  const parent: TRoute = {
    route: entity.route,
    name: entity.name,
    routes: entity.routes,
    permissions: entity.permissions,
    parent: entity,
  }

  const rootPath = entity.type === EEntityTypes.DEFAULT ? '' : route

  const tst = RoutesBuilder({
    parent,
    rootPath,
    routes,
    entity,
    id,
  })

  const element = (
    <Route path={ route }>
      <Permissions permissions={ permissions }>
        <ThemeRender theme={ theme }>
          <Container entity={ entity }>
            <Switch>
              { tst }
            </Switch>
          </Container>
        </ThemeRender>
      </Permissions>
    </Route>
  )

  const EntityInstance: TEntityInstance = {
    id,
    entity,
    element,
  }

  return EntityInstance
}

export default EntityBuilder
