import { Record } from 'immutable'
import Contract from 'models/Contract'
import BaseList, { toEntityList } from 'base/BaseList'

import {
  CONTRACTS_ASYNC_SUCCESS,
  CONTRACTS_ASYNC_FAIL,
  CONTRACTS_UPDATE_PAGE,
} from 'company/actions/contracts'

const ContractOptions = new Record({
  currentPageIndex: 0,
  limit: 15,
  selected: null,
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Contract),
  options: ContractOptions(),
})

const actionsMap = {
  [CONTRACTS_ASYNC_SUCCESS]: (state, action) => {
    const { results, count, next, previous } = action.payload
    return state.merge({
      count,
      next,
      previous,
      results: toEntityList(results, Contract),
    })
  },
  [CONTRACTS_ASYNC_FAIL]: (state, action) => {
    const { errorMessage } = action
    return state.merge({
      errorMessage,
    })
  },
  [CONTRACTS_UPDATE_PAGE]: (state, action) => {
    const { page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page),
    })
  },
}

export default function contracts(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
