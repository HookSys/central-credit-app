import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import app from 'core/reducers/app'
import errors from 'core/reducers/errors'
import user from 'core/reducers/user'
import auth from 'core/reducers/auth'

import Default from 'default/reducers'

export default (history) => combineReducers({
  default: Default,
  app,
  errors,
  user,
  auth,
  router: connectRouter(history),
})
