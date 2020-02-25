// @flow
import type { TPermissionsValidator, TCore } from 'types'
import { EEntityKeys } from 'constants/entity'

function noAuthRequired(): TPermissionsValidator {
  return {
    validate: () => {
      const { Redux: { store: { getState } } }: TCore = this
      const state = getState()
      return state.auth.get('authenticated')
    },
    action: () => {
      const { History, Entity, Redux: { store: { getState } } }: TCore = this
      const user = getState().user.get('data')
      const selectedEntity = user.getSelectedEntity()
      if (!selectedEntity) {
        const { pages } = Entity[EEntityKeys.DEFAULT].entity
        History.push(pages.PROFILES)
      } else {
        const { route } = Entity[selectedEntity.get('entidade_tipo')].entity
        History.push(route)
      }
    },
  }
}

export default noAuthRequired
