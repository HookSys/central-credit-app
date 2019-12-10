import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const EMPLOYEE_ASYNC_SUCCESS = 'EMPLOYEE/EMPLOYEE_ASYNC_SUCCESS'
export const EMPLOYEE_ASYNC_FAIL = 'EMPLOYEE/EMPLOYEE_ASYNC_FAIL'

function employeeAsyncSuccess(employee) {
  return {
    type: EMPLOYEE_ASYNC_SUCCESS,
    payload: employee,
  }
}

function employeeAsyncFail(error) {
  return {
    type: EMPLOYEE_ASYNC_FAIL,
    payload: error,
  }
}

export function employeeAsyncRequest() {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV2({
        path: '/me/funcionarios/',
        method: 'GET',
        body: null,
      })

      const { results } = response
      if (Array.isArray(results) && results.length > 0) {
        await dispatch(employeeAsyncSuccess(results[0]))
        return response
      }

      return null
    } catch (errorMessage) {
      dispatch(employeeAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
