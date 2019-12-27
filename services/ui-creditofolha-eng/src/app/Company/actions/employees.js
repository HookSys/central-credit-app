import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const EMPLOYEES_ASYNC_SUCCESS = 'COMPANY/EMPLOYEES_ASYNC_SUCCESS'
export const EMPLOYEE_ASYNC_SUCCESS = 'COMPANY/EMPLOYEE_ASYNC_SUCCESS'
export const EMPLOYEE_RESET_SELECTED = 'COMPANY/EMPLOYEE_RESET_SELECTED'
export const EMPLOYEES_ASYNC_FAIL = 'COMPANY/EMPLOYEES_ASYNC_FAIL'
export const EMPLOYEES_UPDATE_PAGE = 'COMPANY/EMPLOYEES_UPDATE_PAGE'
export const EMPLOYEES_UPDATE_FILTERS = 'COMPANY/EMPLOYEES_UPDATE_FILTERS'
export const EMPLOYEE_CREATE_SUCCESS = 'COMPANY/EMPLOYEE_CREATE_SUCCESS'

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

export function employeesAsyncRequest(query, status, ordering) {
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

    const user = getState().user.get('data')
    const entity = user.getSelectedEntity()

    try {
      const response = await service.apiV2({
        path: '/empresas/:entity/funcionarios/',
        method: 'POST',
        pathParams: {
          entity: entity.get('entidade_id'),
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
