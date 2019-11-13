
import React from 'react'
import { Route } from 'react-router-dom'
import MetaTags from 'components/MetaTags'
import Permissions from 'components/Permissions'

const StructureSidePanelBuilder = (structure, route, rootPath) => {
  const { SIDEPANEL_ROUTES, NAME: ChildName, COMPONENT: Container } = route
  return Object.keys(SIDEPANEL_ROUTES).reverse().map((key) => {
    const path = key === 'INDEX' ? '' : `${ rootPath }${ SIDEPANEL_ROUTES[key].URL }`
    const Page = SIDEPANEL_ROUTES[key].COMPONENT
    const permissions = SIDEPANEL_ROUTES[key].VALIDATION
    const isFeedback = SIDEPANEL_ROUTES[key].IS_FEEDBACK

    if (isFeedback) {
      return (
        <Route exact path={ path } key={ ChildName + key }>
          <Permissions permissions={ permissions }>
            <MetaTags
              metaTitle={ SIDEPANEL_ROUTES[key].NAME }
              metaTitleSuffix={ ChildName }
            />
            <Page
              structure={ SIDEPANEL_ROUTES[key] }
              rootPath={ rootPath }
              parentStructure={ route }
            />
          </Permissions>
        </Route>
      )
    }

    return (
      <Route exact path={ path } key={ ChildName + key }>
        <Permissions permissions={ permissions }>
          <Container
            structure={ route }
            rootPath={ rootPath }
            parentStructure={ structure }
          >
            <MetaTags
              metaTitle={ SIDEPANEL_ROUTES[key].NAME }
              metaTitleSuffix={ ChildName }
            />
            <Page
              structure={ SIDEPANEL_ROUTES[key] }
              rootPath={ rootPath }
              parentStructure={ route }
            />
          </Container>
        </Permissions>
      </Route>
    )
  })
}

export default StructureSidePanelBuilder
