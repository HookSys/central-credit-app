export default function () {
  const { store: { getState } } = this.store
  const state = getState()
  const user = state.user.get('data')
  const selectedEntity = user.getSelectedEntity()
  return ({ redirectTo, profile }) => {
    if (!selectedEntity || selectedEntity.get('entidade_tipo') !== profile) {
      const { history } = this.history
      history.push(redirectTo)
    }
  }
}
