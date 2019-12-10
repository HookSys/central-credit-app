import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'
import PaymentLot from 'models/PaymentLot'

export const PAYMENT_LOTS_ASYNC_SUCCESS = 'PAYMENT_LOTS_ASYNC_SUCCESS'
export const PAYMENT_LOTS_ASYNC_FAIL = 'PAYMENT_LOTS_ASYNC_FAIL'
export const PAYMENT_LOTS_UPDATE_PAGE = 'PAYMENT_LOTS_UPDATE_PAGE'
export const PAYMENT_LOTS_UPDATE_FILTERS = 'PAYMENT_LOTS_UPDATE_FILTERS'
export const PAYMENT_LOTS_SELECT_ASYNC_SUCCESS = 'PAYMENT_LOTS_SELECT_ASYNC_SUCCESS'
export const PAYMENT_LOTS_RESET_SELECTED = 'PAYMENT_LOTS_RESET_SELECTED'
export const PAYMENT_LOTS_SAVE_SUCCESS = 'PAYMENT_LOTS_SAVE_SUCCESS'
export const PAYMENT_LOTS_COMMENTS_ASYNC_SUCCESS = 'PAYMENT_LOTS_COMMENTS_ASYNC_SUCCESS'
export const PAYMENT_LOTS_POST_COMMENT_ASYNC_SUCCESS = 'PAYMENT_LOTS_POST_COMMENT_ASYNC_SUCCESS'

function paymentLotsAsyncSuccess(payload) {
  return {
    type: PAYMENT_LOTS_ASYNC_SUCCESS,
    payload,
  }
}

function paymentLotAsyncSuccess(payload) {
  return {
    type: PAYMENT_LOTS_SELECT_ASYNC_SUCCESS,
    payload,
  }
}

function paymentLotsAsyncFail(response) {
  return {
    type: PAYMENT_LOTS_ASYNC_FAIL,
    response,
  }
}

export function paymentLotsResetSelected() {
  return {
    type: PAYMENT_LOTS_RESET_SELECTED,
  }
}

export function paymentLotsUpdateFilters(filters) {
  return {
    type: PAYMENT_LOTS_UPDATE_FILTERS,
    filters,
  }
}

export function paymentLotsUpdatePage(page) {
  return {
    type: PAYMENT_LOTS_UPDATE_PAGE,
    page,
  }
}

export function paymentLotsAsyncRequest(query, params) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { paymentLots } = getState().company
    const options = paymentLots.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await service.apiV3({
        path: 'cep/lotes/',
        method: 'GET',
        queryParams: {
          limit: options.get('limit'),
          fields: query,
          offset,
          ...params,
        },
      })

      dispatch(paymentLotsAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(paymentLotsAsyncFail(errorMessage))
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
      dispatch(paymentLotsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}