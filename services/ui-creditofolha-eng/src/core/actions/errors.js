export const ERRORS_SET_ERROR = 'ERRORS_SET_ERROR'
export const ERRORS_CLEAR = 'ERRORS_CLEAR'

export function setError(code, error = {}, critical = false, sentry = {}, body = {}) {
  return {
    type: ERRORS_SET_ERROR,
    code,
    error,
    critical,
    sentry,
    body,
  }
}

export function handleError(response, params) {
  return async (dispatch) => {
    const { status, data } = response

    const connectionErrors = [502, 503, 504]
    const permissionErrors = [403]
    const notFoundErrors = [400, 404]

    if (connectionErrors.includes(status)) {
      return dispatch(setError(505, data, true, null, params))
    }
    if (permissionErrors.includes(status)) {
      return dispatch(setError(401, data, true, null, params))
    }
    if (notFoundErrors.includes(status)) {
      return dispatch(setError(404, data, false, null, params))
    }
    if (status === 401) {
      return dispatch(setError(401, data, false, null, params))
    }

    const { sentry, error } = data
    return dispatch(setError(500, error, true, sentry, params))
  }
}

export function clearErrors() {
  return {
    type: ERRORS_CLEAR,
  }
}
