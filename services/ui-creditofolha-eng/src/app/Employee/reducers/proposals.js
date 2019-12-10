import BaseList, { toEntityList } from 'base/BaseList'
import Proposal from 'employee/models/Proposal'

import {
  PROPOSALS_ASYNC_SUCCESS,
  PROPOSALS_ASYNC_FAIL,
} from 'employee/actions/proposals'

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Proposal),
})

const actionsMap = {
  [PROPOSALS_ASYNC_SUCCESS]: (state, action) => {
    const { results, count, next, previous } = action.payload

    return state.merge({
      count,
      next,
      previous,
      results: toEntityList(results, Proposal),
    })
  },
  [PROPOSALS_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload,
    })
  },
}

export default function proposals(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
