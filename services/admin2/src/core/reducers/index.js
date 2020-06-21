// @flow
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'

import admin from 'admin/reducers'
// import users from 'user/reducers'

import app from 'core/reducers/app'
import errors from 'core/reducers/exception'
import user from 'core/reducers/user'
import relato from 'core/reducers/relato'

const coreState = combineReducers<any, any>({
  admin,
  // users,

  app,
  errors,
  user,
  relato,

  form: formReducer
})

export default coreState
