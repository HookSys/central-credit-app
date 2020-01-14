import { Record } from 'immutable'
import Contract from 'models/Contract'
import BaseList, { toEntityList } from 'base/BaseList'

import {
  CONTRACTS_ASYNC_SUCCESS,
  CONTRACTS_ASYNC_FAIL,
  CONTRACTS_UPDATE_PAGE,
  CONTRACTS_RESET_RESULTS,
  CONTRACTS_CHANGE_SELECT_ALL,
  CONTRACTS_CHANGE_SELECTED,
} from 'company/actions/contracts'

const ContractOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null,
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  skip: 0,
  results: toEntityList([], Contract),
  selected: toEntityList([], Contract),
  options: ContractOptions(),
})

const actionsMap = {
  [CONTRACTS_ASYNC_SUCCESS]: (state, action) => {
    const { results, count, next, previous } = action.payload

    const contractsList = toEntityList(results, Contract)
    const skip = contractsList.filter((contract) => contract.isExpired()).size

    return state.merge({
      count,
      next,
      skip,
      previous,
      results: contractsList,
    })
  },
  [CONTRACTS_RESET_RESULTS]: (state) => {
    return state.merge({
      count: initialState.get('count'),
      skip: initialState.get('skip'),
      next: initialState.get('next'),
      previous: initialState.get('previous'),
      results: initialState.get('results'),
    })
  },
  [CONTRACTS_CHANGE_SELECT_ALL]: (state, action) => {
    const { payload: isAllSelected } = action
    const results = state.get('results').filter((contract) => !contract.isExpired())
    return state.merge({
      selected: isAllSelected ? results : initialState.get('selected'),
    })
  },
  [CONTRACTS_CHANGE_SELECTED]: (state, action) => {
    const { isSelected, contract } = action.payload
    return isSelected ? state.deselectItem(contract) : state.selectItem(contract)
  },
  [CONTRACTS_ASYNC_FAIL]: (state, action) => {
    const { errorMessage } = action
    return state.merge({
      errorMessage,
    })
  },
  [CONTRACTS_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
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
