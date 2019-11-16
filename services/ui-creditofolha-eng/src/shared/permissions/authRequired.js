// @flow
import type { TPermissionsValidator, TCore } from 'types'
// import { EEntityKeys } from 'constants/entity'

function authRequired(): TPermissionsValidator {
  const CreditoFolha: TCore = this
  return {
    validate: () => {
      const { Redux: { store: { getState } } } = CreditoFolha
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
