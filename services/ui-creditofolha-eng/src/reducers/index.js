import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'
import { connectRouter } from 'connected-react-router'

import auth from 'reducers/auth'
import app from 'reducers/app'
import errors from 'reducers/errors'
import user from 'reducers/user'
import contract from 'reducers/contract'
import paymentLot from 'reducers/paymentLot'

export default (history) => combineReducers({
  auth,
  app,
  errors,
  user,
  contract,
  paymentLot,
  router: connectRouter(history),
  form: formReducer,
})
