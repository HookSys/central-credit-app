import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const RECEIVABLES_ASYNC_SUCCESS = 'COMPANY/RECEIVABLES_ASYNC_SUCCESS'
export const RECEIVABLES_ASYNC_FAIL = 'COMPANY/RECEIVABLES_ASYNC_FAIL'
export const RECEIVABLES_UPDATE_PAGE = 'COMPANY/RECEIVABLES_UPDATE_PAGE'
export const RECEIVABLES_UPDATE_FILTERS = 'COMPANY/RECEIVABLES_UPDATE_FILTERS'
export const RECEIVABLES_RESET_RESULTS = 'COMPANY/RECEIVABLES_RESET_RESULTS'

function receivablesAsyncSuccess(payload) {
  return {
    type: RECEIVABLES_ASYNC_SUCCESS,
    payload,
  }
}

function receivablesAsyncFail(payload) {
  return {
    type: RECEIVABLES_ASYNC_FAIL,
    payload,
  }
}

export function receivablesResetResults() {
  return {
    type: RECEIVABLES_RESET_RESULTS,
  }
}

export function receivablesAsyncRequest(query, contractId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    try {
      const response = await service.apiV3({
        path: 'cep/recebiveis/',
        method: 'GET',
        queryParams: {
          contrato: contractId,
          fields: query,
        },
      })

      dispatch(receivablesAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(receivablesAsyncFail(errorMessage))
      return errorMessage
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
