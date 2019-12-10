// @flow
import { combineReducers } from 'redux'

import employee from 'employee/reducers/employee'
import proposals from 'employee/reducers/proposals'

export default combineReducers<any, any>({
  employee,
  proposals,
})
