import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const COMPANIES_ASYNC_SUCCESS = 'ADMIN/COMPANIES_ASYNC_SUCCESS'
export const COMPANY_ASYNC_SUCCESS = 'ADMIN/COMPANY_ASYNC_SUCCESS'
export const COMPANY_RESET_SELECTED = 'ADMIN/COMPANY_RESET_SELECTED'
export const COMPANIES_ASYNC_FAIL = 'ADMIN/COMPANIES_ASYNC_FAIL'
export const COMPANIES_UPDATE_PAGE = 'ADMIN/COMPANIES_UPDATE_PAGE'
export const COMPANIES_UPDATE_FILTERS = 'ADMIN/COMPANIES_UPDATE_FILTERS'
export const COMPANY_CREATE_SUCCESS = 'ADMIN/COMPANY_CREATE_SUCCESS'
export const COMPANY_DELETE_SUCCESS = 'ADMIN/COMPANY_DELETE_SUCCESS'

function companiesAsyncSuccess(companies) {
  return {
    type: COMPANIES_ASYNC_SUCCESS,
    payload: companies
  }
}

function companyAsyncSuccess(companies) {
  return {
    type: COMPANY_ASYNC_SUCCESS,
    payload: companies
  }
}

function companiesAsyncFail(error) {
  return {
    type: COMPANIES_ASYNC_FAIL,
    payload: error
  }
}

function companyCreateSuccess(company) {
  return {
    type: COMPANY_CREATE_SUCCESS,
    payload: company
  }
}

function companyDeleteSuccess() {
  return {
    type: COMPANY_DELETE_SUCCESS
  }
}

export function companyResetSelected() {
  return {
    type: COMPANY_RESET_SELECTED
  }
}

export function companiesUpdatePage(page) {
  return {
    type: COMPANIES_UPDATE_PAGE,
    payload: page
  }
}

export function companiesUpdateFilters(search) {
  return {
    type: COMPANIES_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function companiesAsyncRequest(force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { companies } = getState().admin
    const options = companies.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await service.api({
        path: '/companies',
        method: 'GET',
        force,
        queryParams: {
          limit: options.get('limit'),
          offset
        },
        body: null
      })

      await dispatch(companiesAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(companiesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function companyAsyncRequest(companyId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/companies/:companyId',
        method: 'GET',
        force: true,
        pathParams: {
          companyId
        }
      })

      await dispatch(companyAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(companiesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function companySyncAsyncRequest(code) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/companies/sync/:code',
        method: 'GET',
        pathParams: {
          code
        }
      })

      await dispatch(companyAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(companiesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function companiesSyncAsyncRequest() {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/companies/syncAll',
        force: true,
        method: 'GET'
      })

      await dispatch(companiesAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(companiesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function companyCreateRequest(company) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/companies',
        method: 'POST',
        body: company
      })

      await dispatch(companyCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(companiesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function companyEditRequest(companyId, company) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/companies/:companyId',
        method: 'PATCH',
        pathParams: {
          companyId
        },
        body: company
      })

      await dispatch(companyCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(companiesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function companyDeleteRequest(companyId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      await service.api({
        path: '/companies/:companyId',
        method: 'DELETE',
        pathParams: {
          companyId
        }
      })

      await dispatch(companyDeleteSuccess())
      await dispatch(companyResetSelected())
      return true
    } catch (errorMessage) {
      dispatch(companiesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
