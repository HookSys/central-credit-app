import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MetaTags from 'components/MetaTags'
import Permissions from 'components/Permissions'
import DefaultContainer from 'components/DefaultContainer'

const StructureChildBuilder = (structure, route, rootPath) => {
  const { ROUTES, NAME: ChildName, COMPONENT } = route
  const Container = COMPONENT || DefaultContainer
  return Object.keys(ROUTES).reverse().map((key) => {
    const path = key === 'INDEX' ? '' : `${ rootPath }${ ROUTES[key].URL }`
    const Page = ROUTES[key].COMPONENT
    const permissions = ROUTES[key].VALIDATION
    const isFeedback = ROUTES[key].IS_FEEDBACK
    const hasChilds = typeof ROUTES[key].ROUTES === 'object'

    if (isFeedback) {
      return (
        <Route exact path={ path } key={ ChildName + key }>
          <Permissions permissions={ permissions }>
            <MetaTags
              metaTitle={ ROUTES[key].NAME }
              metaTitleSuffix={ ChildName }
            />
            <Page structure={ ROUTES[key] } rootPath={ rootPath } parentStructure={ route } />
          </Permissions>
        </Route>
      )
    }

    if (hasChilds) {
      return (
        <Route path={ path } key={ ChildName + key }>
          <Permissions permissions={ permissions }>
            <Switch>
              { StructureChildBuilder(structure, ROUTES[key], path) }
            </Switch>
          </Permissions>
        </Route>
      )
    }

    return (
      <Route exact path={ path } key={ ChildName + key }>
        <Permissions permissions={ permissions }>
          <Container structure={ route } rootPath={ rootPath } parentStructure={ structure }>
            <MetaTags
              metaTitle={ ROUTES[key].NAME }
              metaTitleSuffix={ ChildName }
            />
            <Page structure={ ROUTES[key] } rootPath={ rootPath } parentStructure={ route } />
          </Container>
        </Permissions>
      </Route>
    )
  })
}

export default StructureChildBuilder
