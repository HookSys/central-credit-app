// @flow

import { appLoadSpinner, appUnloadSpinner } from 'actions/app'
// import { userAsyncRequest } from 'actions/user'

import { AuthTypes } from 'constants/actionTypes'
import type { AuthSuccessAction, AuthLogoutAction, ThunkAction } from 'types/actions'
import type { TAuthValues } from 'models/auth'

function authSuccess(payload: TAuthValues): AuthSuccessAction {
  return {
    type: AuthTypes.AUTH_SUCCESS,
    payload,
  }
}

export function authLogout(): AuthLogoutAction {
  return {
    type: AuthTypes.AUTH_LOGOUT,
  }
}

export function authRequest(email: string, password: string): ThunkAction {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    try {
      const response = await service.apiV2({
        path: 'auth/login/',
        method: 'POST',
        body: {
          email,
          password,
        },
      })

      await dispatch(authSuccess(response))
      return response
    } catch {
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
