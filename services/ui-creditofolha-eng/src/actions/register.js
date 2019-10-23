export const REGISTER_ASYNC_SUCCESS = 'REGISTER_ASYNC_SUCCESS'
export const REGISTER_ASYNC_FAIL = 'REGISTER_ASYNC_FAIL'
export const REGISTER_FINISHED = 'REGISTER_FINISHED'

function registerAsyncSuccess(cpf, email, senha) {
  return {
    type: REGISTER_ASYNC_SUCCESS,
    data: {
      cpf,
      email,
      senha,
    },
  }
}

function registerAsyncFail(error) {
  return {
    type: REGISTER_ASYNC_FAIL,
    error,
  }
}

export function registerAsyncRequest(cpf, email, senha) {
  return async (dispatch, getState, request) => {
    try {
      const response = await request({
        path: 'signup',
        method: 'POST',
        body: {
          cpf,
          email,
          senha,
        },
      })

      dispatch(registerAsyncSuccess(response))
      return response
    } catch (error) {
      dispatch(registerAsyncFail(error))
      return null
    }
  }
}
