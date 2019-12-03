// @flow
import { combineReducers } from 'redux'

import employees from 'company/reducers/employees'

const company = combineReducers<any, any>({
  employees,
})

export default company
