// @flow
import React, { Fragment } from 'react'
import { EEntityKeys } from 'constants/entity'

import type { TLoader, TEntityLoader } from 'types'

function Entity(): TLoader<TEntityLoader> {
  return {
    load: async () => {
      const { default: DefaultInstance } = await import('default')
      return {
        [EEntityKeys.DEFAULT]: DefaultInstance,
        render() {
          return (
            <Fragment>
              { DefaultInstance.element }
            </Fragment>
          )
        },
      }
    },
  }
}

export default Entity
