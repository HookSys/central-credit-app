export default function ({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      const { service } = this
      return action(dispatch, getState, service)
    }
    return next(action)
  }
}
