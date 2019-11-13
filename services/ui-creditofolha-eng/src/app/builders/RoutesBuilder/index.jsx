/* eslint-disable no-param-reassign */
// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MetaTags from 'components/MetaTags'
import Permissions from 'components/Permissions'
import DefaultContainer from 'components/DefaultContainer'

import type { Structure, StructureRoute, StructureProps, RefStructurePages, Entity } from 'app/types'
import type { Node } from 'react'

type RoutesBuilderProps = {
  routes?: StructureRoute,
  rootPath: string,
  structure: Structure | StructureProps,
  rootKey: string,
  pages: RefStructurePages,
  entity: Entity,
}

const RoutesBuilder = (
  { routes, rootPath, structure, pages, rootKey, entity }: RoutesBuilderProps
) => {
  const { name: ContainerName, component } = structure
  const Container = component || DefaultContainer

  if (!pages.current) {
    pages.current = {}
  }

  if (!routes) {
    return null
  }

  return Object.keys(routes).reverse().map<Node>((key: string) => {
    const { route } = routes[key]
    const path = key === 'INDEX' && !route ? '' : `${ rootPath }${ route }`

    if (typeof routes[key].routes === 'object') {
      pages.current[key] = {}
      return (
        <Route path={ path } key={ rootPath + key }>
          <Permissions permissions={ routes[key].permissions }>
            <Switch>
              { RoutesBuilder({
                routes: routes[key].routes,
                rootPath: path,
                structure: routes[key],
                pages,
                rootKey: key,
                entity,
              }) }
            </Switch>
          </Permissions>
        </Route>
      )
    }

    if (rootKey && typeof pages.current[rootKey] === 'object') {
      pages.current[rootKey][key] = key === 'INDEX' ? rootPath : path
    } else {
      pages.current[key] = path
    }

    const Page = routes[key].component

    if (routes[key].isFeedback) {
      return (
        <Route exact path={ path } key={ rootPath + key }>
          <Permissions permissions={ routes[key].permissions }>
            <MetaTags
              metaTitle={ routes[key].name }
              metaTitleSuffix={ ContainerName }
            />
            <Page
              structure={ routes[key] }
              rootPath={ rootPath }
              parent={ structure }
              entity={ entity }
            />
          </Permissions>
        </Route>
      )
    }

    return (
      <Route exact path={ path } key={ rootPath + key }>
        <Permissions permissions={ routes[key].permissions }>
          <Container structure={ routes[key] } rootPath={ rootPath } parent={ structure }>
            <MetaTags
              metaTitle={ routes[key].name }
              metaTitleSuffix={ ContainerName }
            />
            <Page
              structure={ routes[key] }
              rootPath={ rootPath }
              parent={ structure }
              entity={ entity }
            />
          </Container>
        </Permissions>
      </Route>
    )
  })
}

export default RoutesBuilder
