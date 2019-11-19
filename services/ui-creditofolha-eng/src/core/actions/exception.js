// @flow
import { EXCEPTION_SAVE, EXCEPTION_CLEAR } from 'core/constants/actionsType'
import { Map } from 'immutable'

import type { $AxiosXHR } from 'axios'
import type { TPromiseAction, TExceptionHandleAction, TExceptionClearAction, TThunkAction } from 'core/types'

function create(
  code: number,
  data: Object,
  request: Map<any, any>,
  critical?: boolean,
  sentry?: Object
): TExceptionHandleAction {
  return {
    type: EXCEPTION_SAVE,
    payload: {
      code,
      data,
      request,
      critical,
      sentry,
    },
  }
}

export function clear(): TExceptionClearAction {
  return {
    type: EXCEPTION_CLEAR,
  }
}

export function handle<T: Object, R: Object = T>(
  response: $AxiosXHR<T, R>,
  params: T
): TThunkAction {
  return async (dispatch): TPromiseAction => {
    const { status, data } = response

    const connectionErrors = [502, 503, 504]
    const permissionErrors = [403]
    const notFoundErrors = [400, 404]

    if (connectionErrors.includes(status)) {
      return dispatch(create(505, data, params, true))
    }
    if (permissionErrors.includes(status)) {
      return dispatch(create(401, data, params, true))
    }
    if (notFoundErrors.includes(status)) {
      return dispatch(create(404, data, params))
    }
    if (status === 401) {
      return dispatch(create(401, data, params))
    }

    const { sentry, error } = data
    return dispatch(create(500, error, params, true, sentry))
  }
}
