import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'
import { authLogout } from 'core/actions/auth'
import { removeEmptyKeys } from 'helpers'

export const USER_ASYNC_SUCCESS = 'CORE/USER_ASYNC_SUCCESS'
export const USER_ASYNC_FAIL = 'CORE/USER_ASYNC_FAIL'
export const USER_SELECT_ENTITY = 'CORE/USER_SELECT_ENTITY'
export const USER_SET_RECENTLY_CREATED = 'CORE/USER_SET_RECENTLY_CREATED'
export const USER_LOGOUT = 'CORE/USER_LOGOUT'
export const USER_ACCEPT_TERMS_SUCCESS = 'CORE/USER_ACCEPT_TERMS_SUCCESS'
export const USER_VALIDATION_SUCCESS = 'CORE/USER_ACCEPT_TERMS_SUCCESS'

function userAsyncSuccess(user) {
  return {
    type: USER_ASYNC_SUCCESS,
    user,
  }
}

function userValidationSuccess(user) {
  return {
    type: USER_VALIDATION_SUCCESS,
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

export function userUpdateInformations(email, token, password, newPassword, phone) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    const body = removeEmptyKeys({
      email,
      token,
      password_atual: password,
      password_novo: newPassword,
      telefone_celular: phone,
    })

    try {
      const response = await await service.apiV2({
        path: 'me/',
        method: 'POST',
        body,
      })
      dispatch(userValidationSuccess(response))
      return response
    } catch (error) {
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
