import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'
import { connectRouter } from 'connected-react-router'

import auth from 'reducers/auth'
import app from 'reducers/app'
import errors from 'reducers/errors'
import user from 'reducers/user'

export default (history) => combineReducers({
  auth,
  app,
  errors,
  user,
  router: connectRouter(history),
  form: formReducer,
})
