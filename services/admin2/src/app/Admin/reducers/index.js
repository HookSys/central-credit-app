// @flow
import { combineReducers } from 'redux'

import companies from './companies'
import users from './users'

export default combineReducers<any, any>({
  companies,
  users
})
