import { Record } from 'immutable'
import Contract from 'models/Contract'
import BaseList, { toEntityList } from 'models/utils/BaseList'

import {
  CONTRACT_ASYNC_SUCCESS,
  CONTRACT_ASYNC_FAIL,
} from 'actions/contract'

const ContractOptions = new Record({
  currentPageIndex: 0,
  limit: 15,
})

const initialState = new BaseList({
  errorMessage: '',
  results: toEntityList([], Contract),
  options: ContractOptions(),
})

const actionsMap = {
  [CONTRACT_ASYNC_SUCCESS]: (state, action) => {
    const { results, count, next, previous } = action

    return state.merge({
      count,
      next,
      previous,
      results: toEntityList(results, Contract),
    })
  },
  [CONTRACT_ASYNC_FAIL]: (state, action) => {
    const { errorMessage } = action
    return state.merge({
      errorMessage,
    })
  },
}

export default function contracts(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
