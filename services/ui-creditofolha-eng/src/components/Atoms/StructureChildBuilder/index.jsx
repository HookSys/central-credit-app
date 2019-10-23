import React from 'react'
import { Route } from 'react-router-dom'
import { MetaTags, Permissions } from 'components'

const StructureChildBuilder = (structure, route, rootPath) => {
  const { THEME } = structure
  const { ROUTES, NAME: ChildName } = route
  return Object.keys(ROUTES).reverse().map((key) => {
    const path = key === 'INDEX' ? '' : `${ rootPath }${ ROUTES[key].URL }`
    const Page = ROUTES[key].COMPONENT
    const permissions = ROUTES[key].VALIDATION

    return (
      <Route exact path={ path } key={ ChildName + key }>
        <Permissions permissions={ permissions }>
          <MetaTags
            metaTitle={ ROUTES[key].NAME }
            metaTitleSuffix={ ChildName }
            theme={ THEME }
          />
          <Page structure={ structure } />
        </Permissions>
      </Route>
    )
  })
}

export default StructureChildBuilder
