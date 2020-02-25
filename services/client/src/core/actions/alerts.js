import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const ALERTS_ASYNC_SUCCESS = 'CORE/ALERTS_ASYNC_SUCCESS'
export const ALERTS_ASYNC_FAIL = 'CORE/ALERTS_ASYNC_FAIL'
export const ALERTS_UPDATE_PAGE = 'CORE/ALERTS_UPDATE_PAGE'

function alertsAsyncSuccess(alerts) {
  return {
    type: ALERTS_ASYNC_SUCCESS,
    payload: alerts,
  }
}

function alertsAsyncFail(error) {
  return {
    type: ALERTS_ASYNC_FAIL,
    payload: error,
  }
}

export function alertsUpdatePage(page) {
  return {
    type: ALERTS_UPDATE_PAGE,
    payload: page,
  }
}

export function alertsAsyncRequest(params) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())


    const { alerts } = getState()
    const options = alerts.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await service.apiV2({
        path: 'me/alertas/',
        method: 'GET',
        queryParams: {
          limit: options.get('limit'),
          offset,
          ...params,
        },
        body: null,
      })

      await dispatch(alertsAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(alertsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
