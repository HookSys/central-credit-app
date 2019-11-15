// @flow
import React, { Fragment } from 'react'

import type { TEntityElementType } from 'app/entities/types'
import type { Loader, Entity } from 'app/types'
import type { Element } from 'react'

import Entities from 'app/entities'

function entity(): Loader<Entity> {
  return {
    load: async () => {
      return {
        Entities,
        render() {
          return (
            <Fragment>
              { Object.keys(Entities).map<Element<TEntityElementType>>(
                (key) => {
                  const t = Entities[key].element
                  return t
                }
              ) }
            </Fragment>
          )
        },
      }
    },
  }
}

export default entity
