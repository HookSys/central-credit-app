import { appLoadSpinner, appUnloadSpinner } from 'actions/app'

export const ALERT_ASYNC_SUCCESS = 'ALERT_ASYNC_SUCCESS'
export const ALERT_ASYNC_FAIL = 'ALERT_ASYNC_FAIL'

function alertAsyncSuccess(collection, extraParams, search, limit, offset) {
  return {
    type: ALERT_ASYNC_SUCCESS,
    ...collection,
    extraParams,
    search,
    limit,
    offset,
  }
}

function alertAsyncFail(errorMessage) {
  return {
    type: ALERT_ASYNC_FAIL,
    errorMessage,
  }
}

export function alertAsyncRequest(query, extraParams) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    try {
      const response = await service.apiV3({
        path: 'alerta/',
        queryParams: {
          fields: query,
          ...extraParams,
        },
        method: 'GET',
      })

      dispatch(alertAsyncSuccess(response, extraParams))
      return response
    } catch (errorMessage) {
      dispatch(alertAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
