export default function () {
  const { store: { getState } } = this.store
  const state = getState()
  if (!state.user.get('wasRecentlyCreated')) {
    return ({ redirectTo }) => {
      const { getHistory } = this.spy
      getHistory().push(redirectTo)
    }
  }

  return true
}
