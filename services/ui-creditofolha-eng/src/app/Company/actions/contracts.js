import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'
import Contract from 'models/Contract'

export const CONTRACTS_ASYNC_SUCCESS = 'COMPANY/CONTRACTS_ASYNC_SUCCESS'
export const CONTRACT_ASYNC_SUCCESS = 'COMPANY/CONTRACT_ASYNC_SUCCESS'
export const CONTRACTS_ASYNC_FAIL = 'COMPANY/CONTRACTS_ASYNC_FAIL'
export const CONTRACTS_RESET_RESULTS = 'COMPANY/CONTRACTS_RESET_RESULTS'
export const CONTRACTS_UPDATE_PAGE = 'COMPANY/CONTRACTS_UPDATE_PAGE'
export const CONTRACTS_CHANGE_SELECT_ALL = 'COMPANY/CONTRACTS_CHANGE_SELECT_ALL'
export const CONTRACTS_CHANGE_SELECTED = 'COMPANY/CONTRACTS_CHANGE_SELECTED'
export const CONTRACT_RESET_SELECTED = 'COMPANY/CONTRACT_RESET_SELECTED'

function contractsAsyncSuccess(payload) {
  return {
    type: CONTRACTS_ASYNC_SUCCESS,
    payload,
  }
}

function contractAsyncFail(errorMessage) {
  return {
    type: CONTRACTS_ASYNC_FAIL,
    errorMessage,
  }
}

function contractAsyncSuccess(payload) {
  return {
    type: CONTRACT_ASYNC_SUCCESS,
    payload,
  }
}

export function contractResetSelected() {
  return {
    type: CONTRACT_RESET_SELECTED,
  }
}

export function contractsUpdatePage(page) {
  return {
    type: CONTRACTS_UPDATE_PAGE,
    payload: page,
  }
}

export function contractsResetResults() {
  return {
    type: CONTRACTS_RESET_RESULTS,
  }
}

export function contractsChangeSelectAll(isAllSelected) {
  return {
    type: CONTRACTS_CHANGE_SELECT_ALL,
    payload: isAllSelected,
  }
}

export function contractsChangeSelected(contract, isSelected) {
  return {
    type: CONTRACTS_CHANGE_SELECTED,
    payload: {
      contract,
      isSelected,
    },
  }
}

export function contractsAsyncRequest(query, params) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { contracts } = getState().company
    const options = contracts.get('options')
    const search = contracts.getIn(['filters', 'search'])
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await service.apiV3({
        path: 'cep/contratos/',
        queryParams: {
          limit: options.get('limit'),
          fields: query,
          offset,
          search,
          ...params,
        },
        method: 'GET',
      })

      dispatch(contractsAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(contractAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function contractAsyncRequest(query, contractId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: 'cep/contratos/:contractId/',
        pathParams: {
          contractId,
        },
        queryParams: {
          fields: query,
        },
        method: 'GET',
      })

      dispatch(contractAsyncSuccess(response))
      return new Contract(response)
    } catch (errorMessage) {
      dispatch(contractAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
