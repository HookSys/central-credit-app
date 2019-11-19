// @flow
import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'
import { authRequest } from 'core/actions/auth'

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
