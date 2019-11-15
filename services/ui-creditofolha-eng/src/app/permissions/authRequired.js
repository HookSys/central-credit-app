// @flow
import type { Validator, AppData } from 'app/types'
import { EEntityKeys } from 'constants/entity'

function authRequired(): Validator {
  const appData: AppData = this
  return {
    validate: () => {
      const { Redux: { store: { getState } } } = appData
      const state = getState()
      return !state.auth.get('authenticated')
    },
    action: () => {
      // const { History, Entity } = appData
      // const { pages } = Entity[EEntityKeys.DEFAULT]
      // History.push(pages.LOGIN)
    },
  }
}

export default authRequired
