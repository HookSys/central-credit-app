// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Permissions from 'components/Permissions'
import ThemeRender from 'components/ThemeRender'

import type { Node } from 'react'
import type { TEntity } from 'app/types'

type TEntityEntryBuilderProps = {
  entity: TEntity,
  children: Node,
}
function EntityEntryBuilder({ entity, children }: TEntityEntryBuilderProps) {
  const { theme, entry } = entity
  const { route, permissions, component: Container } = entry

  return (
    <Route path={ route }>
      <Permissions permissions={ permissions }>
        <ThemeRender theme={ theme }>
          <Container entity={ entity }>
            <Switch>
              { children }
            </Switch>
          </Container>
        </ThemeRender>
      </Permissions>
    </Route>
  )
}

export default EntityEntryBuilder
