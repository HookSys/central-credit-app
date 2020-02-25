// @flow
import type { TPermissionsValidator, TCore } from 'types'
import { EEntityKeys } from 'constants/entity'

function authRequired(): TPermissionsValidator {
  return {
    validate: () => {
      const { Redux: { store: { getState } } }: TCore = this
      const state = getState()
      return !state.auth.get('authenticated')
    },
    action: () => {
      const { History, Entity }: TCore = this
      const { pages } = Entity[EEntityKeys.DEFAULT].entity
      History.push(pages.LOGIN)
    },
  }
}

export default authRequired
