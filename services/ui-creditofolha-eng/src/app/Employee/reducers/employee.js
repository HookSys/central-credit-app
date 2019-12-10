import Base from 'base/Base'
import Employee from 'employee/models/Employee'

import {
  EMPLOYEE_ASYNC_SUCCESS,
  EMPLOYEE_ASYNC_FAIL,
} from 'employee/actions/employee'

const initialState = new Base({
  errorMessage: '',
  data: new Employee({}),
})

const actionsMap = {
  [EMPLOYEE_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      errorMessage: '',
      data: new Employee(payload),
    })
  },
  [EMPLOYEE_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload,
    })
  },
}

export default function employee(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
