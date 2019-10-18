import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { StructureRoutesBuilder } from 'components'

const StructureBuilder = (structure) => {
  const { CONTAINER: Container } = structure
  return (
    <Route path={ structure.ENTRY }>
      <Container>
        <Switch>
          { StructureRoutesBuilder(structure) }
        </Switch>
      </Container>
    </Route>
  )
}

export default StructureBuilder
