import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { STRUCTURE_TYPES } from 'constants/structure'
import MetaTags from 'components/MetaTags'
import Permissions from 'components/Permissions'
import StructureChildBuilder from '../StructureChildBuilder'
import StructureSidePanelBuilder from '../StructureSidePanelBuilder'

const StructureRoutesBuilder = (structure) => {
  const { type, entry, routes, name: ContainerName } = structure
  const rootPath = type !== STRUCTURE_TYPES.DEFAULT ? entry : ''
  return Object.keys(routes).reverse().map((key) => {
    const path = key === 'INDEX' ? '' : `${ rootPath }${ routes[key].route }`
    const permissions = null
    const hasChilds = typeof routes[key].routes === 'object'
    const hasSidePanelRoutes = typeof routes[key].SIDEPANEL_ROUTES === 'object'
    const Page = routes[key].component

    if (hasChilds) {
      return (
        <Route path={ path } key={ entry + key }>
          <Permissions permissions={ permissions }>
            <Switch>
              { StructureChildBuilder(structure, routes[key], path) }
            </Switch>
          </Permissions>
        </Route>
      )
    }

    if (hasSidePanelRoutes) {
      return (
        <Route path={ path } key={ entry + key }>
          <Permissions permissions={ permissions }>
            <Switch>
              { StructureSidePanelBuilder(structure, routes[key], path) }
            </Switch>
          </Permissions>
        </Route>
      )
    }

    return (
      <Route exact path={ path } key={ entry + key }>
        <Permissions permissions={ permissions }>
          <MetaTags
            metaTitle={ routes[key].name }
            metaTitleSuffix={ ContainerName }
          />
          <Page structure={ routes[key] } rootPath={ rootPath } parentStructure={ structure } />
        </Permissions>
      </Route>
    )
  })
}

export default StructureRoutesBuilder
