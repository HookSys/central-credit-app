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
    const { getDispatch } = this.spy
    const dispatch = getDispatch()
    dispatch(userSelectEntity(entity.get('entidade_id')))
    return () => {
      const { getHistory } = this.spy
      setTimeout(() => getHistory().push(structure.ENTRY))
    }
  }

  return true
}
