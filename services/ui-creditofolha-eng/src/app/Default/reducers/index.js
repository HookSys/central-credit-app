import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'

export default combineReducers({
  form: formReducer,
})
