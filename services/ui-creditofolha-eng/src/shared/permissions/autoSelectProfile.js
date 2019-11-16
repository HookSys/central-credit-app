import { userSelectEntity } from 'actions/user'

export default function () {
  const { store: { getState } } = this.store
  const state = getState()
  const user = state.user.get('data')
  const selectedEntity = user.getSelectedEntity()
  const entities = user.get('funcoes')
  if (!selectedEntity && entities.size === 1) {
    const entity = entities.get(0)
    const structure = this.structures[entity.get('entidade_tipo')]
    const { store: { dispatch } } = this.store
    dispatch(userSelectEntity(entity.get('entidade_id')))
    return () => {
      const { history } = this.history
      setTimeout(() => history.push(structure.ENTRY))
    }
  }

  return true
}
