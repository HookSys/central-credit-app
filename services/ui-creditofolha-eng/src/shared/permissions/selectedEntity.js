// @flow
import { getRoutesFromPathname } from 'helpers'
import { EEntityKeys } from 'constants/entity'

import type { TPermissionsValidator, TCore } from 'types'

function selectedEntity(): TPermissionsValidator {
  return {
    validate: () => {
      const { Entity, Redux: { store: { getState } } }: TCore = this
      const user = getState().user.get('data')
      const { location: { pathname } } = getState().router
      const entity = user.getSelectedEntity()
      if (!entity) {
        return true
      }

      const [currentRoute] = getRoutesFromPathname(pathname)
      const { route } = Entity[entity.get('entidade_tipo')].entity
      return currentRoute !== route
    },
    action: () => {
      const { History, Entity }: TCore = this
      const { pages } = Entity[EEntityKeys.DEFAULT].entity
      History.push(pages.PROFILES)
    },
  }
}

export default selectedEntity
