import { appLoadSpinner, appUnloadSpinner } from 'actions/app'
import { authLogout } from './auth'

export const USER_ASYNC_SUCCESS = 'USER_ASYNC_SUCCESS'
export const USER_ASYNC_FAIL = 'USER_ASYNC_FAIL'
export const USER_SELECT_ENTITY = 'USER_SELECT_ENTITY'
export const USER_LOGOUT = 'USER_LOGOUT'

function userAsyncSuccess(user) {
  return {
    type: USER_ASYNC_SUCCESS,
    user,
  }
}

function userAsyncFail(errorMessage) {
  return {
    type: USER_ASYNC_SUCCESS,
    errorMessage,
  }
}

function userLogoutRequest() {
  return {
    type: USER_LOGOUT,
  }
}

export function userLogout() {
  return async (dispatch) => {
    await dispatch(userLogoutRequest())
    await dispatch(authLogout())
  }
}

export function userSelectEntity(entityId) {
  return {
    type: USER_SELECT_ENTITY,
    entityId,
  }
}

export function userAsyncRequest() {
  return async (dispatch, getState, request) => {
    dispatch(appLoadSpinner())
    const access = getState().auth.get('access')
    try {
      const response = await request({
        path: 'me/',
        method: 'GET',
        token: access,
        body: null,
      })

      await dispatch(userAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(userAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
