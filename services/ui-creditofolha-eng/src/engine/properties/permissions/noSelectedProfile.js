export default function () {
  const { store: { getState } } = this.store
  const state = getState()
  const user = state.user.get('data')
  const selectedEntity = user.getSelectedEntity()
  if (selectedEntity) {
    const structure = this.structures[selectedEntity.get('entidade_tipo')]
    return () => {
      const { history } = this.history
      history.push(structure.ENTRY)
    }
  }

  return true
}
