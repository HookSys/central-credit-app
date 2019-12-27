import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'
import PaymentLot from 'models/PaymentLot'

export const PAYMENT_LOTS_ASYNC_SUCCESS = 'COMPANY/PAYMENT_LOTS_ASYNC_SUCCESS'
export const PAYMENT_LOTS_ASYNC_FAIL = 'COMPANY/PAYMENT_LOTS_ASYNC_FAIL'
export const PAYMENT_LOTS_UPDATE_PAGE = 'COMPANY/PAYMENT_LOTS_UPDATE_PAGE'
export const PAYMENT_LOTS_UPDATE_FILTERS = 'COMPANY/PAYMENT_LOTS_UPDATE_FILTERS'
export const PAYMENT_LOTS_SELECT_ASYNC_SUCCESS = 'COMPANY/PAYMENT_LOTS_SELECT_ASYNC_SUCCESS'
export const PAYMENT_LOTS_RESET_SELECTED = 'COMPANY/PAYMENT_LOTS_RESET_SELECTED'
export const PAYMENT_LOTS_SAVE_SUCCESS = 'COMPANY/PAYMENT_LOTS_SAVE_SUCCESS'
export const PAYMENT_LOTS_COMMENTS_ASYNC_SUCCESS = 'COMPANY/PAYMENT_LOTS_COMMENTS_ASYNC_SUCCESS'
export const PAYMENT_LOTS_POST_COMMENT_ASYNC_SUCCESS = 'COMPANY/PAYMENT_LOTS_POST_COMMENT_ASYNC_SUCCESS'

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

export function paymentLotByMonthAsyncRequest(query, month) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: 'cep/lotes/:month/',
        method: 'GET',
        pathParams: {
          month,
        },
        queryParams: {
          fields: query,
        },
      })

      dispatch(paymentLotAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(paymentLotsAsyncFail(errorMessage))
      return errorMessage
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function paymentLotByMonthSaveRequest(month, values) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: 'cep/lotes/:month/',
        method: 'PUT',
        pathParams: {
          month,
        },
        body: values,
      })

      dispatch(paymentLotAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(paymentLotsAsyncFail(errorMessage))
      return errorMessage
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function paymentLotByMonthSendRequest(month) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: 'cep/lotes/:month/submeter/',
        method: 'POST',
        pathParams: {
          month,
        },
      })

      dispatch(paymentLotAsyncSuccess(response))
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
