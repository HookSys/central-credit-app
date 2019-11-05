import { appLoadSpinner, appUnloadSpinner } from 'actions/app'
import { userAsyncRequest } from 'actions/user'

export const AUTH_ASYNC_FAIL = 'AUTH_ASYNC_FAIL'
export const AUTH_ASYNC_SUCCESS = 'AUTH_ASYNC_SUCCESS'
export const AUTH_REFRESH_SUCCESS = 'AUTH_REFRESH_SUCCESS'
export const AUTH_REFRESH_ASYNC_START = 'AUTH_REFRESH_ASYNC_START'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'


function authAsyncSuccess(response) {
  return {
    type: AUTH_ASYNC_SUCCESS,
    ...response,
  }
}

function authAsyncFail(errors) {
  return {
    type: AUTH_ASYNC_FAIL,
    errors,
  }
}

function authRefreshSuccess(response) {
  return {
    type: AUTH_REFRESH_SUCCESS,
    ...response,
  }
}

function authRefreshStart(refreshTokenPromise) {
  return {
    type: AUTH_REFRESH_ASYNC_START,
    refreshTokenPromise,
  }
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  }
}

export function authRequest(email, password) {
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

      await dispatch(authAsyncSuccess(response))
      await dispatch(userAsyncRequest())
      return response
    } catch (error) {
      dispatch(authAsyncFail(error))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function authRefresh(dispatch, getState, service) {
  const refresh = getState().auth.get('refresh')
  dispatch(appLoadSpinner())

  const refreshTokenPromise = service.apiV2({
    path: 'auth/refresh-login/',
    method: 'POST',
    body: {
      refresh,
    },
  })
    .then((response) => {
      dispatch(authRefreshSuccess(response))
      dispatch(appUnloadSpinner())
    })
    .catch(() => {
      dispatch(authAsyncFail('Your session has expired. Please log in'))
      dispatch(authLogout())
    })

  dispatch(authRefreshStart(refreshTokenPromise))
  return refreshTokenPromise
}
