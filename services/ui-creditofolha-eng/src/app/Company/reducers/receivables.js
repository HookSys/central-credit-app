import Receivable from 'models/Receivable'
import BaseList, { toEntityList } from 'base/BaseList'
import { Record } from 'immutable'

import {
  RECEIVABLES_ASYNC_SUCCESS,
  RECEIVABLES_ASYNC_FAIL,
  RECEIVABLES_RESET_RESULTS,
} from 'company/actions/receivables'

const ReceivablesOptions = new Record({
  total: 0,
  totalPaid: 15,
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Receivable),
  options: ReceivablesOptions({}),
})

const actionsMap = {
  [RECEIVABLES_RESET_RESULTS]: (state) => {
    return state.merge({
      count: initialState.get('count'),
      results: initialState.get('results'),
    })
  },
  [RECEIVABLES_ASYNC_SUCCESS]: (state, action) => {
    const { results, count } = action.payload
    const resultsObj = toEntityList(results, Receivable)
    const totalPaid = resultsObj.filter((r) => r.isPaid()).size
    const options = state.get('options')
    return state.merge({
      results: resultsObj,
      options: options.set('total', resultsObj.size).set('totalPaid', totalPaid),
      count,
    })
  },
  [RECEIVABLES_ASYNC_FAIL]: (state, action) => {
    const { payload: errorMessage } = action
    return state.merge({
      errorMessage,
    })
  },
}

export default function receivable(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
