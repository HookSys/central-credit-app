// @flow
import React from 'react'
import { EEntityKeys } from 'constants/entity'
import SwitchTransition from 'components/SwitchTransition'

import type { TLoader, TEntityLoader } from 'types'

function Entity(): TLoader<TEntityLoader> {
  return {
    load: async () => {
      const { default: DefaultInstance } = await import('default')
      const { default: EmployeeInstance } = await import('employee')
      const { default: CompanyInstance } = await import('company')

      return {
        [EEntityKeys.DEFAULT]: DefaultInstance,
        [EEntityKeys.EMPLOYEE]: EmployeeInstance,
        [EEntityKeys.COMPANY]: CompanyInstance,
        render() {
          return (
            <SwitchTransition>
              { EmployeeInstance.element }
              { CompanyInstance.element }
              { DefaultInstance.element }
            </SwitchTransition>
          )
        },
      }
    },
  }
}

export default Entity
