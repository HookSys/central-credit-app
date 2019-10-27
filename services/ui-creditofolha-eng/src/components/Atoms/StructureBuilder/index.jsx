import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { StructureRoutesBuilder, Permissions, ThemeRender } from 'components'

const StructureBuilder = (structure) => {
  const { CONTAINER: Container, VALIDATION, THEME } = structure
  return (
    <Route path={ structure.ENTRY }>
      <Permissions permissions={ VALIDATION }>
        <Container structure={ structure }>
          <ThemeRender theme={ THEME } />
          <Switch>
            { StructureRoutesBuilder(structure) }
          </Switch>
        </Container>
      </Permissions>
    </Route>
  )
}

export default StructureBuilder
