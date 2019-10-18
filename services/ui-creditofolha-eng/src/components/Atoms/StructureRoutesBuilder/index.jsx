import React from 'react'
import { Route } from 'react-router-dom'
import { DEFAULT } from 'engine/constants/types'
import { MetaTags } from 'components'

const StructureRoutesBuilder = (structure) => {
  const { TYPE, ENTRY, ROUTES, NAME: ContainerName, THEME } = structure
  const rootPath = TYPE !== DEFAULT ? ENTRY : ''

  return Object.keys(ROUTES).reverse().map((key) => {
    const path = key === 'INDEX' ? '' : `${ rootPath }${ ROUTES[key].URL }`
    const Page = ROUTES[key].COMPONENT
    return (
      <Route exact path={ path }>
        <MetaTags
          metaTitle={ ROUTES[key].NAME }
          metaTitleSuffix={ ContainerName }
          theme={ THEME }
        />
        <Page />
      </Route>
    )
  })
}

export default StructureRoutesBuilder
