import Errors from 'core/models/Errors'

import { ERRORS_SET_ERROR, ERRORS_CLEAR } from 'core/actions/errors'

const REDUX_FORM_SUBMIT = '@@redux-form/START_SUBMIT'
const REDUX_FORM_CHANGE = '@@redux-form/CHANGE'

const initialState = new Errors()

const actionsMap = {
  [REDUX_FORM_SUBMIT]: (state, action) => {
    const { meta: { form }, payload: { registeredFields } } = action
    return state.set('formRegisteredFields', registeredFields).set('formName', form)
  },
  [REDUX_FORM_CHANGE]: (state, action) => {
    const { meta: { field, form } } = action
    return state.updateFormFieldErrors(field, form)
  },
  [ERRORS_SET_ERROR]: (state, action) => {
    const { code, error, critical, sentry, body } = action
    return state.throw({
      code,
      critical,
      error,
      sentry,
      body,
    })
  },
  [ERRORS_CLEAR]: () => {
    return initialState
  },
}

export default function errors(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
