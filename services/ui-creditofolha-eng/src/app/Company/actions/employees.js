import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const EMPLOYEES_ASYNC_SUCCESS = 'COMPANY/EMPLOYEES_ASYNC_SUCCESS'
export const EMPLOYEE_ASYNC_SUCCESS = 'COMPANY/EMPLOYEE_ASYNC_SUCCESS'
export const EMPLOYEES_ASYNC_FAIL = 'COMPANY/EMPLOYEES_ASYNC_FAIL'
export const EMPLOYEES_UPDATE_PAGE = 'COMPANY/EMPLOYEES_UPDATE_PAGE'
export const EMPLOYEES_UPDATE_FILTERS = 'COMPANY/EMPLOYEES_UPDATE_FILTERS'

function employeesAsyncSuccess(employees) {
  return {
    type: EMPLOYEES_ASYNC_SUCCESS,
    payload: employees,
  }
}

function employeeAsyncSuccess(employees) {
  return {
    type: EMPLOYEE_ASYNC_SUCCESS,
    payload: employees,
  }
}

function employeesAsyncFail(error) {
  return {
    type: EMPLOYEES_ASYNC_FAIL,
    payload: error,
  }
}


export function employeesUpdatePage(page) {
  return {
    type: EMPLOYEES_UPDATE_PAGE,
    payload: page,
  }
}

export function employeesUpdateFilters(search) {
  return {
    type: EMPLOYEES_UPDATE_FILTERS,
    payload: {
      search,
    },
  }
}

export function employeesAsyncRequest(query) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { employees } = getState().company
    const options = employees.get('options')
    const search = employees.getIn(['filters', 'search'])
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await service.apiV3({
        path: '/cep/funcionarios/',
        method: 'GET',
        queryParams: {
          limit: options.get('limit'),
          fields: query,
          offset,
          search,
        },
        body: null,
      })

      await dispatch(employeesAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(employeesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function employeeAsyncRequest(query, employeeId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: '/cep/funcionarios/:employeeId/',
        method: 'GET',
        pathParams: {
          employeeId,
        },
        queryParams: {
          fields: query,
        },
        body: null,
      })

      await dispatch(employeeAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(employeesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
