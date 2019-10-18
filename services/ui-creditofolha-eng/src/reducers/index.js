import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'

import auth from 'reducers/auth'
import app from 'reducers/app'
import errors from 'reducers/errors'

export default combineReducers({
  auth,
  app,
  errors,
  form: formReducer,
})
