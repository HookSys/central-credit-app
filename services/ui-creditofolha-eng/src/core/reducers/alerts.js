import BaseList, { toEntityList } from 'base/BaseList'
import Alert from 'models/Alert'
import { Record } from 'immutable'

import {
  ALERTS_ASYNC_SUCCESS,
  ALERTS_ASYNC_FAIL,
  ALERTS_UPDATE_PAGE,
} from 'core/actions/alerts'

const AlertsOptions = new Record({
  currentPageIndex: 0,
  limit: 15,
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Alert),
  options: AlertsOptions({}),
})

const actionsMap = {
  [ALERTS_ASYNC_SUCCESS]: (state, action) => {
    const { results, count, next, previous } = action.payload
    return state.merge({
      count,
      next,
      previous,
      results: toEntityList(results, Alert),
    })
  },
  [ALERTS_ASYNC_FAIL]: (state, action) => {
    const { errorMessage } = action
    return state.merge({
      errorMessage,
    })
  },
  [ALERTS_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page),
    })
  },
}

export default function alerts(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
