// @flow
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'

// import type { Reducer } from 'redux'

import app from 'core/reducers/app'
import errors from 'core/reducers/exception'
import user from 'core/reducers/user'
import auth from 'core/reducers/auth'
import alerts from 'core/reducers/alerts'

// import type { TCoreState, TAction } from 'core/types'

// import Default from 'default/reducers'
import company from 'company/reducers'
import employee from 'employee/reducers'

const coreState = combineReducers<any, any>({
  // default: Default,
  company,
  employee,

  app,
  errors,
  user,
  auth,
  alerts,

  form: formReducer,
})

export default coreState
