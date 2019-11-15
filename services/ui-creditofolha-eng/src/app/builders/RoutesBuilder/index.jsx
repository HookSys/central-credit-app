/* eslint-disable no-param-reassign */
// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MetaTags from 'components/MetaTags'
import Permissions from 'components/Permissions'
import DefaultContainer from 'components/DefaultContainer'

import type { TEntity, TEntityEntry, TRoutes, TRoute } from 'app/types'

import type { Node } from 'react'

type TRoutesBuilderProps = {
  rootPath: string,
  routes: TRoutes,
  parent: TRoute | TEntityEntry,
  entity: TEntity,
  id: string,
}
function RoutesBuilder({ rootPath, routes, parent, entity, id }: TRoutesBuilderProps) {
  const { name, component } = parent
  const Container = component || DefaultContainer

  if (!routes) {
    return null
  }

  return Object.keys(routes).reverse().map<Node>((key) => {
    const route = routes[key]
    const { route: url } = route
    const path = key === 'INDEX' && !url ? '' : `${ rootPath }${ url }`

    if (route.routes && typeof route.routes === 'object') {
      const cId = `${ id }>${ key }`
      return (
        <Route path={ path } key={ cId }>
          <Permissions permissions={ route.permissions }>
            <Switch>
              { RoutesBuilder({
                rootPath: path,
                routes: route.routes,
                parent: route,
                entity,
                id: cId,
              }) }
            </Switch>
          </Permissions>
        </Route>
      )
    }

    if (route.component) {
      const Page = route.component
      if (route.isFeedback) {
        return (
          <Route exact path={ path } key={ rootPath + key }>
            <Permissions permissions={ route.permissions }>
              <MetaTags
                metaTitle={ route.name }
                metaTitleSuffix={ name }
              />
              <Page
                parent={ parent }
                route={ route }
                entity={ entity }
              />
            </Permissions>
          </Route>
        )
      }

      return (
        <Route exact path={ path } key={ rootPath + key }>
          <Permissions permissions={ route.permissions }>
            <Container
              route={ route }
              parent={ parent }
              entity={ entity }
            >
              <MetaTags
                metaTitle={ route.name }
                metaTitleSuffix={ name }
              />
              <Page
                route={ route }
                parent={ parent }
                entity={ entity }
              />
            </Container>
          </Permissions>
        </Route>
      )
    }

    return null
  })
}

export default RoutesBuilder
