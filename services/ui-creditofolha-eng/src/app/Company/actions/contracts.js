import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const CONTRACTS_ASYNC_SUCCESS = 'COMPANY/CONTRACTS_ASYNC_SUCCESS'
export const CONTRACTS_ASYNC_FAIL = 'COMPANY/CONTRACTS_ASYNC_FAIL'
export const CONTRACTS_UPDATE_PAGE = 'COMPANY/CONTRACTS_UPDATE_PAGE'

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
