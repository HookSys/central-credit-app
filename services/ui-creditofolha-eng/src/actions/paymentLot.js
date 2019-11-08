import { appLoadSpinner, appUnloadSpinner } from 'actions/app'
import PaymentLot from 'models/PaymentLot'

export const PAYMENT_LOT_ASYNC_SUCCESS = 'PAYMENT_LOT_ASYNC_SUCCESS'
export const PAYMENT_LOT_ASYNC_FAIL = 'PAYMENT_LOT_ASYNC_FAIL'
export const PAYMENT_LOT_UPDATE_PAGE = 'PAYMENT_LOT_UPDATE_PAGE'
export const PAYMENT_LOT_UPDATE_FILTERS = 'PAYMENT_LOT_UPDATE_FILTERS'
export const PAYMENT_LOT_SELECT_ASYNC_SUCCESS = 'PAYMENT_LOT_SELECT_ASYNC_SUCCESS'
export const PAYMENT_LOT_RESET_SELECTED = 'PAYMENT_LOT_RESET_SELECTED'
export const PAYMENT_LOT_SAVE_SUCCESS = 'PAYMENT_LOT_SAVE_SUCCESS'
export const PAYMENT_LOT_COMMENTS_ASYNC_SUCCESS = 'PAYMENT_LOT_COMMENTS_ASYNC_SUCCESS'
export const PAYMENT_LOT_POST_COMMENT_ASYNC_SUCCESS = 'PAYMENT_LOT_POST_COMMENT_ASYNC_SUCCESS'

function paymentLotsAsyncSuccess(response) {
  return {
    type: PAYMENT_LOT_ASYNC_SUCCESS,
    ...response,
  }
}

function paymentLotAsyncSuccess(data) {
  return {
    type: PAYMENT_LOT_SELECT_ASYNC_SUCCESS,
    data,
  }
}

function paymentLotAsyncFail(response) {
  return {
    type: PAYMENT_LOT_ASYNC_FAIL,
    response,
  }
}

export function paymentLotResetSelected() {
  return {
    type: PAYMENT_LOT_RESET_SELECTED,
  }
}

export function paymentLotUpdateFilters(filters) {
  return {
    type: PAYMENT_LOT_UPDATE_FILTERS,
    filters,
  }
}

export function paymentLotUpdatePage(page) {
  return {
    type: PAYMENT_LOT_UPDATE_PAGE,
    page,
  }
}

export function paymentLotsAsyncRequest(query, limit, offset, extraParams) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    try {
      const response = await service.apiV3({
        path: 'cep/lotes/',
        method: 'GET',
        queryParams: {
          fields: query,
          limit,
          offset,
          ...extraParams,
        },
      })

      dispatch(paymentLotsAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(paymentLotAsyncFail(errorMessage))
      return errorMessage
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}


export function paymentLotAsyncRequest(query, lotId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    try {
      const response = await service.apiV3({
        path: 'cep/lotes/:lotId',
        method: 'GET',
        queryParams: {
          fields: query,
        },
        pathParams: {
          lotId,
        },
      })

      dispatch(paymentLotAsyncSuccess(response))
      return new PaymentLot(response)
    } catch (errorMessage) {
      dispatch(paymentLotAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
