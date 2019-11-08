import { appLoadSpinner, appUnloadSpinner } from 'actions/app'

export const CONTRACT_ASYNC_SUCCESS = 'CONTRACT_ASYNC_SUCCESS'
export const CONTRACT_ASYNC_FAIL = 'CONTRACT_ASYNC_FAIL'

function contractListAsyncSuccess(collection, extraParams, search, limit, offset) {
  return {
    type: CONTRACT_ASYNC_SUCCESS,
    ...collection,
    extraParams,
    search,
    limit,
    offset,
  }
}

function contractAsyncFail(errorMessage) {
  return {
    type: CONTRACT_ASYNC_FAIL,
    errorMessage,
  }
}

export function contractListAsyncRequestCEP(query, search, limit, offset, extraParams) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    try {
      const response = await service.apiV3({
        path: 'cep/contratos/',
        queryParams: {
          fields: query,
          limit,
          offset,
          search,
          ...extraParams,
        },
        method: 'GET',
      })

      dispatch(contractListAsyncSuccess(response, extraParams, search, limit, offset))
      return response
    } catch (errorMessage) {
      dispatch(contractAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
