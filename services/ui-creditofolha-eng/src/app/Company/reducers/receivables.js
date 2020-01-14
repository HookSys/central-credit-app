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
    const resultsEntity = toEntityList(results, Receivable).filter((r) => !r.get('gerado_por'))
    const total = resultsEntity.size
    const totalPaid = resultsEntity.reduce((totalPaidIn, item) => {
      if (!item.get('isOpened')) {
        return totalPaidIn + 1
      }
      return totalPaidIn
    }, 0)

    return state.merge({
      results: resultsEntity,
      count,
      options: ReceivablesOptions({
        total,
        totalPaid,
      }),
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
