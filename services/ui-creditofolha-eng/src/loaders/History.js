// @flow
import { createBrowserHistory } from 'history'
import type { History as THistory } from 'react-router-dom'
import type { TLoader, TCore, TRoute } from 'types'
import { getRouteStructure } from 'helpers'

function History(): TLoader<THistory> {
  const createdHistory: THistory = createBrowserHistory()

  const getStructure = (history: THistory): ?TRoute => {
    const { Entity, Redux: { store: { getState } } }: TCore = this
    const user = getState().user.get('data')
    const entity = user.getSelectedEntity()
    if (!entity) {
      return null
    }

    const { pages, routes } = Entity[entity.get('entidade_tipo')].entity
    const { location: { pathname } } = history
    const structure = getRouteStructure(pathname, pages, routes)

    return structure
  }

  Object.defineProperty(createdHistory, 'getStructure', {
    value() {
      return getStructure(this)
    },
  })
  return {
    load: async () => {
      return createdHistory
    },
  }
}

export default History
