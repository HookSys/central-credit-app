// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Permissions from 'components/Permissions'
import ThemeRender from 'components/ThemeRender'

import type { Structure } from 'app/types'
import type { Node } from 'react'

type StructureBuilderProps = {
  structure: Structure,
  children: Node,
}

const StructureBuilder = ({ structure, children }: StructureBuilderProps) => {
  const { component: Container } = structure

  return (
    <Route path={ structure.entry }>
      <Permissions permissions={ structure.permissions }>
        <ThemeRender theme={ structure.theme }>
          <Container structure={ structure }>
            <Switch>
              { children }
            </Switch>
          </Container>
        </ThemeRender>
      </Permissions>
    </Route>
  )
}

export default StructureBuilder
