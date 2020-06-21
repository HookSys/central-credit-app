import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const REPORT_SELLER_ASYNC_SUCCESS = 'SELLER/REPORT_SELLER_ASYNC_SUCCESS'
export const REPORT_SELLER_ASYNC_FAIL = 'SELLER/REPORT_SELLER_ASYNC_FAIL'

function reportUserAsyncSuccess(sellers) {
  return {
    type: REPORT_SELLER_ASYNC_SUCCESS,
    payload: sellers
  }
}

function reportUserAsyncFail(error) {
  return {
    type: REPORT_SELLER_ASYNC_FAIL,
    payload: error
  }
}

export function reportUserAsyncRequest(sellerId, force = true) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/sellers/:sellerId/funnel-tokens',
        method: 'GET',
        force,
        pathParams: {
          sellerId
        },
        body: null
      })

      await dispatch(reportUserAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(reportUserAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
