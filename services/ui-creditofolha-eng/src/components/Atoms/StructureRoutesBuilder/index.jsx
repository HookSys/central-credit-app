import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { DEFAULT } from 'engine/constants/types'
import { MetaTags, Permissions } from 'components'
import StructureChildBuilder from '../StructureChildBuilder'

const StructureRoutesBuilder = (structure) => {
  const { TYPE, ENTRY, ROUTES, NAME: ContainerName, THEME } = structure
  const rootPath = TYPE !== DEFAULT ? ENTRY : ''
  return Object.keys(ROUTES).reverse().map((key) => {
    const path = key === 'INDEX' ? '' : `${ rootPath }${ ROUTES[key].URL }`
    const permissions = ROUTES[key].VALIDATION
    const hasChilds = typeof ROUTES[key].ROUTES === 'object'
    const Page = ROUTES[key].COMPONENT

    if (hasChilds) {
      return (
        <Route path={ path } key={ ENTRY + key }>
          <Permissions permissions={ permissions }>
            <Page structure={ structure }>
              <Switch>
                { StructureChildBuilder(structure, ROUTES[key], path) }
              </Switch>
            </Page>
          </Permissions>
        </Route>
      )
    }

    return (
      <Route exact path={ path } key={ ENTRY + key }>
        <Permissions permissions={ permissions }>
          <MetaTags
            metaTitle={ ROUTES[key].NAME }
            metaTitleSuffix={ ContainerName }
            theme={ THEME }
          />
          <Page structure={ structure } />
        </Permissions>
      </Route>
    )
  })
}

export default StructureRoutesBuilder
