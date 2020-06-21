// @flow
import React from 'react'
import { EProfileKeys } from 'constants/profile'
import SwitchTransition from 'components/SwitchTransition'

import type { TLoader, TProfileLoader } from 'types'

function Profile(): TLoader<TProfileLoader> {
  return {
    load: async () => {
      const { default: DefaultInstance } = await import('default')
      const { default: UserInstance } = await import('user')
      const { default: AdminInstance } = await import('admin')

      return {
        [EProfileKeys.DEFAULT]: DefaultInstance,
        [EProfileKeys.USER]: UserInstance,
        [EProfileKeys.ADMIN]: AdminInstance,
        render() {
          return (
            <SwitchTransition>
              { UserInstance.element }
              { AdminInstance.element }
              { DefaultInstance.element }
            </SwitchTransition>
          )
        }
      }
    }
  }
}

export default Profile
