import { Record, List } from 'immutable'
import BaseList, { toEntityList } from 'models/utils/BaseList'
import PaymentLot from 'models/PaymentLot'
import PaymentLotComment from 'models/PaymentLotComment'

import {
  PAYMENT_LOT_ASYNC_SUCCESS,
  PAYMENT_LOT_ASYNC_FAIL,
  PAYMENT_LOT_UPDATE_PAGE,
  PAYMENT_LOT_UPDATE_FILTERS,
  PAYMENT_LOT_SELECT_ASYNC_SUCCESS,
  PAYMENT_LOT_RESET_SELECTED,
  PAYMENT_LOT_SAVE_SUCCESS,
  PAYMENT_LOT_COMMENTS_ASYNC_SUCCESS,
  PAYMENT_LOT_POST_COMMENT_ASYNC_SUCCESS,
} from 'actions/paymentLot'

const PaymentLotFilters = new Record({
  search: '',
  month: null,
  year: null,
})

const PaymentLotOptions = new Record({
  currentPageIndex: 0,
  limit: 15,
  selected: null,
  comments: new List(),
})

const initialState = new BaseList({
  errorMessage: '',
  results: toEntityList([], PaymentLot),
  options: PaymentLotOptions(),
  filters: PaymentLotFilters(),
})

const actionsMap = {
  [PAYMENT_LOT_SELECT_ASYNC_SUCCESS]: (state, action) => {
    const { data } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new PaymentLot(data)),
    })
  },
  [PAYMENT_LOT_SAVE_SUCCESS]: (state, action) => {
    const { data } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new PaymentLot(data)),
    })
  },
  [PAYMENT_LOT_POST_COMMENT_ASYNC_SUCCESS]: (state, action) => {
    const { data } = action
    const options = state.get('options')
    const comments = options.get('comments')
    const newComments = comments.push(new PaymentLotComment(data))
    return state.merge({
      options: options.set('comments', BaseList.getListSorted(newComments, 'data', true, true)),
    })
  },
  [PAYMENT_LOT_COMMENTS_ASYNC_SUCCESS]: (state, action) => {
    const { results } = action
    const options = state.get('options')
    const comments = toEntityList(results, PaymentLotComment)
    return state.merge({
      options: options.set('comments', BaseList.getListSorted(comments, 'data', true, true)),
    })
  },
  [PAYMENT_LOT_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', initialState.getIn(['options', 'selected']))
        .set('comments', initialState.getIn(['options', 'comments'])),
    })
  },
  [PAYMENT_LOT_ASYNC_SUCCESS]: (state, action) => {
    const { results, count, next, previous } = action
    return state.merge({
      count,
      next,
      previous,
      results: toEntityList(results, PaymentLot),
    })
  },
  [PAYMENT_LOT_ASYNC_FAIL]: (state, action) => {
    const { errorMessage } = action
    return state.merge({
      errorMessage,
    })
  },
  [PAYMENT_LOT_UPDATE_FILTERS]: (state, action) => {
    const { filters } = action
    const filtersState = state.get('filters')
    return state.merge({
      filters: filtersState.merge(filters),
    })
  },
  [PAYMENT_LOT_UPDATE_PAGE]: (state, action) => {
    const { page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page),
    })
  },
}

export default function paymentLot(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
