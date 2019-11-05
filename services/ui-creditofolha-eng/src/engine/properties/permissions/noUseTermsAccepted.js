export default function () {
  const { store: { getState } } = this.store
  const state = getState()
  if (state.user.getIn(['data', 'useTermsAccepted'])) {
    return ({ redirectTo }) => {
      const { history } = this.history
      history.push(redirectTo)
    }
  }

  return true
}
