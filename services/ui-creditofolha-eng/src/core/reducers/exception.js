// @flow
import Exception from 'core/models/Exception'
import { REDUX_FORM_SUBMIT, REDUX_FORM_CHANGE, EXCEPTION_SAVE, EXCEPTION_CLEAR } from 'core/constants/actionsType'

import type { Reducer } from 'redux'
import type { TActionTypes } from 'types/actionsType'
import type { TException, IException, TAction, TSubmitAction, TChangeAction } from 'core/types'

type TState = IException<TException>
const initialState: TState = new Exception()

type TExceptionReducer = {
  [key: TActionTypes]: Reducer<TState, TAction>
}

const actionsMap: TExceptionReducer = {
  [REDUX_FORM_SUBMIT]: (state: TState, action: TSubmitAction): TState => {
    const { meta: { form }, payload: { registeredFields } } = action
    const tst = state.set('fields', registeredFields).set('form', form)
    return tst
  },
  [REDUX_FORM_CHANGE]: (state: TState, action: TChangeAction) => {
    const { meta: { field, form } } = action
    return state.updateFormFieldErrors(field, form)
  },
  [EXCEPTION_SAVE]: (state, action) => {
    const { code, error, critical, sentry, body } = action
    return state.throw({
      code,
      critical,
      error,
      sentry,
      body,
    })
  },
  [EXCEPTION_CLEAR]: () => {
    return initialState
  },
}

const exception: Reducer<TState, TAction> = (
  state: TState = initialState,
  action: TAction
) => {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}

export default exception
