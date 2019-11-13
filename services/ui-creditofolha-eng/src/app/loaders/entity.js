// @flow
import React, { Fragment } from 'react'

import type { Loader, EntityManager } from 'app/types'
import type { Element } from 'react'

import Structures from 'app/structures'

function entity(): Loader<EntityManager> {
  return {
    load: async () => {
      return {
        ...Structures,
        render() {
          return (
            <Fragment>
              { Object.keys(Structures).map<Element<any>>(
                (key: string) => Structures[key].element
              ) }
            </Fragment>
          )
        },
      }
    },
  }
}

export default entity
