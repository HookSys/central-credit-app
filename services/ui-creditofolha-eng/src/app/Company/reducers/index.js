// @flow
import { combineReducers } from 'redux'

import employees from 'company/reducers/employees'
import contracts from 'company/reducers/contracts'
import paymentLots from 'company/reducers/paymentLots'

const company = combineReducers<any, any>({
  employees,
  contracts,
  paymentLots,
})

export default company
