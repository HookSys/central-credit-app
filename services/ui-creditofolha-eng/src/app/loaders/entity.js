// @flow
import React, { Fragment } from 'react'

import type { TLoader, TEntityLoader, TEntityElementType } from 'app/types'
import type { Element } from 'react'

import Entities from 'app/entities'

function Entity(): TLoader<TEntityLoader> {
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

export default Entity
