import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'
import { authRequest } from 'core/actions/auth'
import { userSetRecentlyCreated } from 'core/actions/user'

export const REGISTER_ASYNC_SUCCESS = 'REGISTER_ASYNC_SUCCESS'
export const REGISTER_ASYNC_FAIL = 'REGISTER_ASYNC_FAIL'

function registerAsyncSuccess(cpf, email, password) {
  return {
    type: REGISTER_ASYNC_SUCCESS,
    payload: {
      cpf,
      email,
      password,
    },
  }
}


function registerAsyncFail(payload) {
  return {
    type: REGISTER_ASYNC_FAIL,
    payload,
  }
}


export function registerAsyncRequest(cpf, email, password) {
  return async (dispatch, getState, services) => {
    dispatch(appLoadSpinner())
    try {
      const response = await services.apiV2({
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
