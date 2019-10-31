import React, { Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import { DEFAULT } from 'engine/constants/types'
import { MetaTags, Permissions } from 'components'
import StructureChildBuilder from '../StructureChildBuilder'
import StructureSidePanelBuilder from '../StructureSidePanelBuilder'

const StructureRoutesBuilder = (structure) => {
  const { TYPE, ENTRY, ROUTES, NAME: ContainerName, THEME } = structure
  const rootPath = TYPE !== DEFAULT ? ENTRY : ''
  return Object.keys(ROUTES).reverse().map((key) => {
    const path = key === 'INDEX' ? '' : `${ rootPath }${ ROUTES[key].URL }`
    const permissions = ROUTES[key].VALIDATION
    const hasChilds = typeof ROUTES[key].ROUTES === 'object'
    const hasSidePanelRoutes = typeof ROUTES[key].SIDEPANEL_ROUTES === 'object'
    const Page = ROUTES[key].COMPONENT
          
    if (hasChilds) {
      return (
        <Route path={ path } key={ ENTRY + key }>
          <Permissions permissions={ permissions }>
            <Switch>
              { StructureChildBuilder(structure, ROUTES[key], path) }
            </Switch>
          </Permissions>
        </Route>
      )
    }

    if (hasSidePanelRoutes) {
      return (
        <Route path={ path } key={ ENTRY + key }>
          <Permissions permissions={ permissions }>
            <Switch>
              { StructureSidePanelBuilder(structure, ROUTES[key], path) }
            </Switch>
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
          />
          <Page structure={ ROUTES[key] } rootPath={ rootPath } parentStructure={ structure } />
        </Permissions>
      </Route>
    )
  })
}

export default StructureRoutesBuilder
