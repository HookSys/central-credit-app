import { appLoadSpinner, appUnloadSpinner } from 'actions/app'
import { userSetRecentlyCreated } from 'actions/user'
import { authRequest } from 'actions/auth'

export const REGISTER_ASYNC_SUCCESS = 'REGISTER_ASYNC_SUCCESS'
export const REGISTER_ASYNC_FAIL = 'REGISTER_ASYNC_FAIL'
export const REGISTER_FINISHED = 'REGISTER_FINISHED'

function registerAsyncSuccess(cpf, email, password) {
  return {
    type: REGISTER_ASYNC_SUCCESS,
    data: {
      cpf,
      email,
      password,
    },
  }
}

function registerAsyncFail(error) {
  return {
    type: REGISTER_ASYNC_FAIL,
    error,
  }
}

export function registerAsyncRequest(cpf, email, password) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    try {
      const response = await service.apiV2({
        path: 'signup',
        method: 'POST',
        body: {
          cpf,
          email,
          senha: password,
        },
      })

      await dispatch(registerAsyncSuccess(response))
      await dispatch(authRequest(email, password))
      await dispatch(userSetRecentlyCreated(true))
      return response
    } catch (error) {
      dispatch(registerAsyncFail(error))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
