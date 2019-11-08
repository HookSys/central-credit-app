import { appLoadSpinner, appUnloadSpinner } from 'actions/app'
import { authLogout } from './auth'

export const USER_ASYNC_SUCCESS = 'USER_ASYNC_SUCCESS'
export const USER_ASYNC_FAIL = 'USER_ASYNC_FAIL'
export const USER_SELECT_ENTITY = 'USER_SELECT_ENTITY'
export const USER_SET_RECENTLY_CREATED = 'USER_SET_RECENTLY_CREATED'
export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_ACCEPT_TERMS_SUCCESS = 'USER_ACCEPT_TERMS_SUCCESS'

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

function userAcceptTermsSuccess(response) {
  return {
    type: USER_ACCEPT_TERMS_SUCCESS,
    response,
  }
}

function userLogoutRequest() {
  return {
    type: USER_LOGOUT,
  }
}

export function userSetRecentlyCreated(wasRecentlyCreated) {
  return {
    type: USER_SET_RECENTLY_CREATED,
    wasRecentlyCreated,
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
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV2({
        path: 'me/',
        method: 'GET',
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

export function userFunctionAsyncRequest() {
  return async (dispatch, getState, request) => {
    dispatch(appLoadSpinner())
    const selectedEntityId = getState().user.get('selectedEntityId')

    try {
      const response = await request({
        path: `financeiras/${ selectedEntityId }`,
        method: 'GET',
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

export function userAcceptTermsRequest() {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    try {
      const response = await service.apiV2({
        path: 'funcionario-termo-de-uso/',
        method: 'POST',
        body: null,
      })

      await dispatch(userAcceptTermsSuccess(response))
      await dispatch(userAsyncRequest())
      return true
    } catch (errorMessage) {
      dispatch(userAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
