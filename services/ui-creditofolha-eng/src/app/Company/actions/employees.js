import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const EMPLOYEES_ASYNC_SUCCESS = 'COMPANY/EMPLOYEES_ASYNC_SUCCESS'
export const EMPLOYEE_ASYNC_SUCCESS = 'COMPANY/EMPLOYEE_ASYNC_SUCCESS'
export const EMPLOYEE_RESET_SELECTED = 'COMPANY/EMPLOYEE_RESET_SELECTED'
export const EMPLOYEES_ASYNC_FAIL = 'COMPANY/EMPLOYEES_ASYNC_FAIL'
export const EMPLOYEES_UPDATE_PAGE = 'COMPANY/EMPLOYEES_UPDATE_PAGE'
export const EMPLOYEES_UPDATE_FILTERS = 'COMPANY/EMPLOYEES_UPDATE_FILTERS'
export const EMPLOYEE_CREATE_SUCCESS = 'COMPANY/EMPLOYEE_CREATE_SUCCESS'
export const EMPLOYEE_FIRED_SUCCESS = 'COMPANY/EMPLOYEE_FIRED_SUCCESS'

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

function employeeCreateSuccess(employee) {
  return {
    type: EMPLOYEE_CREATE_SUCCESS,
    payload: employee,
  }
}

function employeeFiredSuccess() {
  return {
    type: EMPLOYEE_FIRED_SUCCESS,
  }
}

export function employeeResetSelected() {
  return {
    type: EMPLOYEE_RESET_SELECTED,
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

export function employeesAsyncRequest(query, status, ordering, force = false) {
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
        force,
        queryParams: {
          limit: options.get('limit'),
          fields: query,
          offset,
          search,
          status,
          ordering,
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

export function employeeDemissionAsyncRequest(query, employeeId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: '/cep/funcionarios/:employeeId/demitir/',
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

export function employeeCreateRequest(employee) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: '/cep/funcionarios/',
        method: 'POST',
        body: employee,
      })

      await dispatch(employeeCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(employeesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function employeeCreateBulkRequest(employees) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: '/cep/funcionarios/bulk/',
        method: 'POST',
        body: {
          funcionarios: employees,
        },
      })

      await dispatch(employeeCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(employeesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function employeeEditRequest(employeeId, employee) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: '/cep/funcionarios/:employeeId/',
        method: 'PUT',
        pathParams: {
          employeeId,
        },
        body: employee,
      })

      await dispatch(employeeCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(employeesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function employeeFireRequest(employeeId, firedDate, amountCep) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: '/cep/funcionarios/:employeeId/demitir/',
        method: 'PUT',
        pathParams: {
          employeeId,
        },
        body: {
          demissao_em: firedDate,
          valor_descontado: amountCep,
        },
      })

      await dispatch(employeeFiredSuccess())
      await dispatch(employeeResetSelected())
      return response
    } catch (errorMessage) {
      dispatch(employeesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
