// @flow
import { AUTH_LOGOUT, AUTH_SUCCESS } from 'core/constants/actionsType'
import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'
import { userAsyncRequest } from 'core/actions/user'

import type { TAuthSuccessAction, TAuthLoginRequest, TAuthLoginResponse, TPromiseAction, TAuthLogoutAction, TThunkAction } from 'core/types'

function authAsyncSuccess(
  payload: TAuthLoginResponse
): TAuthSuccessAction {
  return {
    type: AUTH_SUCCESS,
    payload,
  }
}

export function authLogout(): TAuthLogoutAction {
  return {
    type: AUTH_LOGOUT,
  }
}

export function authRequest(email: string, password: string): TThunkAction {
  return async (dispatch, state, services): TPromiseAction => {
    dispatch(appLoadSpinner())
    try {
      const response = await services.apiV2<TAuthLoginRequest, TAuthLoginResponse>({
        path: 'auth/login/',
        method: 'POST',
        body: {
          email,
          password,
        },
      })

      await dispatch(authAsyncSuccess(response))
      await dispatch(userAsyncRequest())
      return response
    } catch (error) {
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
