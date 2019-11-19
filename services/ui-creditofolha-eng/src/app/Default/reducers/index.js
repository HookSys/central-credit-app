// @flow

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'
import type { TDefaultState } from 'default/types'

export default combineReducers<TDefaultState, any>({
  form: formReducer,
})
