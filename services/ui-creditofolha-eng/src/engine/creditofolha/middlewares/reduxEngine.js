export default function ({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      const { request } = this.service
      return action(dispatch, getState, request)
    }
    return next(action)
  }
}
