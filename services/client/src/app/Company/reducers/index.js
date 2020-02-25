// @flow
import { combineReducers } from 'redux'

import employees from 'company/reducers/employees'
import contracts from 'company/reducers/contracts'
import paymentLots from 'company/reducers/paymentLots'
import receivables from 'company/reducers/receivables'

const company = combineReducers<any, any>({
  employees,
  contracts,
  paymentLots,
  receivables,
})

export default company
