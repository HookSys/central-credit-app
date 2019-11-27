// @flow
import { userSelectEntity } from 'core/actions/user'

import type { TPermissionsValidator, TCore } from 'types'

function autoSelectProfile(): TPermissionsValidator {
  return {
    validate: () => {
      const { Redux: { store: { getState } } }: TCore = this
      const user = getState().user.get('data')
      const entities = user.get('funcoes')
      return entities.size === 1
    },
    action: () => {
      const { History, Entity, Redux }: TCore = this
      const { store: { getState, dispatch } } = Redux
      const entities = getState().user.getIn(['data', 'funcoes'])
      const entity = entities.get(0)
      dispatch(userSelectEntity(entity.get('identificador')))

      const { route } = Entity[entity.get('entidade_tipo')].entity
      setTimeout(() => History.push(route))
    },
  }
}

export default autoSelectProfile
