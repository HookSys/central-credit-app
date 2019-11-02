export default function () {
  const { store: { getState } } = this.store
  const state = getState()
  if (state.user.getIn(['data', 'useTermsAccepted'])) {
    return ({ redirectTo }) => {
      const { getHistory } = this.spy
      getHistory().push(redirectTo)
    }
  }

  return true
}
