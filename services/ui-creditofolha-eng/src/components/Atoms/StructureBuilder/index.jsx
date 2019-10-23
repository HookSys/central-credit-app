import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { StructureRoutesBuilder, Permissions } from 'components'

const StructureBuilder = (structure) => {
  const { CONTAINER: Container, VALIDATION } = structure
  return (
    <Route path={ structure.ENTRY }>
      <Permissions permissions={ VALIDATION }>
        <Container structure={ structure }>
          <Switch>
            { StructureRoutesBuilder(structure) }
          </Switch>
        </Container>
      </Permissions>
    </Route>
  )
}

export default StructureBuilder
