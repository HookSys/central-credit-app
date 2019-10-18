import { appLoadSpinner, appUnloadSpinner } from 'actions/app'
import ApiEngine from 'engine'

export const AUTH_ASYNC_FAIL = 'AUTH_ASYNC_FAIL'
export const AUTH_ASYNC_SUCCESS = 'AUTH_ASYNC_SUCCESS'
export const AUTH_REFRESH_SUCCESS = 'AUTH_REFRESH_SUCCESS'
export const AUTH_REFRESH_ASYNC_START = 'AUTH_REFRESH_ASYNC_START'
export const DE_AUTH_SUCCESS = 'DE_AUTH_SUCCESS'


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

export function deAuthSuccess() {
  return {
    type: DE_AUTH_SUCCESS,
  }
}

export function authRequest(email, password) {
  return async (dispatch) => {
    dispatch(appLoadSpinner())
    try {
      const response = await asyncRequest({
        path: 'auth/login/',
        method: 'POST',
        body: {
          email,
          password,
        },
      })

      await dispatch(authAsyncSuccess(response))
      return response
    } catch (error) {
      dispatch(authAsyncFail(error))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function authRefresh(dispatch, getState) {
  const refresh = getState().auth.get('refresh')
  dispatch(appLoadSpinner())

  const refreshTokenPromise = asyncRequest({
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
      dispatch(deAuthSuccess())
    })

  dispatch(authRefreshStart(refreshTokenPromise))
  return refreshTokenPromise
}
