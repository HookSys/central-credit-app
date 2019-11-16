import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const AUTH_ASYNC_SUCCESS = 'AUTH_ASYNC_SUCCESS'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

function authAsyncSuccess(response) {
  return {
    type: AUTH_ASYNC_SUCCESS,
    ...response,
  }
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  }
}

export function authRequest(email, password) {
  return async (dispatch, state, services) => {
    dispatch(appLoadSpinner())
    try {
      const response = await services.apiV2({
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
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
