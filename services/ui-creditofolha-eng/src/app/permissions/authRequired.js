// @flow
import type { Permission, AppData } from 'app/types'
import { DEFAULT } from 'constants/entity'

function authRequired(): Permission {
  const appData: AppData = this
  return {
    validate: () => {
      const { Redux: { store: { getState } } } = appData
      const state = getState()
      return !state.auth.get('authenticated')
    },
    action: () => {
      const { History, Entity } = appData
      const { pages } = Entity[DEFAULT]
      History.push(pages.LOGIN)
    },
  }
}

export default authRequired
