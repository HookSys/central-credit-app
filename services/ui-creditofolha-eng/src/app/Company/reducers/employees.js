import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import Employee from 'company/models/Employee'

import {
  EMPLOYEES_ASYNC_SUCCESS,
  EMPLOYEES_ASYNC_FAIL,
  EMPLOYEES_UPDATE_PAGE,
} from 'company/actions/employees'

const EmployeesOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null,
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Employee),
  options: EmployeesOptions(),
})

const actionsMap = {
  [EMPLOYEES_ASYNC_SUCCESS]: (state, action) => {
    const { results, count, next, previous } = action.payload

    return state.merge({
      count,
      next,
      previous,
      results: toEntityList(results, Employee),
    })
  },
  [EMPLOYEES_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload,
    })
  },
  [EMPLOYEES_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page),
    })
  },
}

export default function employees(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
