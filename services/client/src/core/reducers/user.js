/* eslint-disable camelcase */
import User from 'models/User'
import Base from 'base/Base'

import {
  USER_ASYNC_SUCCESS,
  USER_ASYNC_FAIL,
  USER_SELECT_ENTITY,
  USER_SET_RECENTLY_CREATED,
  USER_LOGOUT,
  USER_VALIDATION_SUCCESS
} from 'core/actions/user'

// const REHYDRATE = 'persist/REHYDRATE'

const initialState = new Base({
  errorMessage: '',
  data: new User({})
})

const actionsMap = {
  [USER_ASYNC_SUCCESS]: (state, action) => {
    return state.merge({
      data: new User(action.user)
    })
  },
  [USER_ASYNC_FAIL]: (state, action) => {
    const { errorMessage } = action
    return state.merge({
      errorMessage
    })
  },
  [USER_SET_RECENTLY_CREATED]: (state, action) => {
    const { wasRecentlyCreated } = action
    const userData = state.get('data')
    return state.merge({
      data: userData.set('wasRecentlyCreated', wasRecentlyCreated)
    })
  },
  [USER_SELECT_ENTITY]: (state, action) => {
    const { entityId } = action
    const userData = state.get('data')
    return state.merge({
      data: userData.setIn(['selectedEntityId'], entityId)
    })
  },
  [USER_VALIDATION_SUCCESS]: (state, action) => {
    const {
      email,
      telefone_celular,
      email_verificado,
      telefone_celular_verificado
    } = action.user
    const userData = state.get('data')
    return state.merge({
      data: userData
        .set('email', email)
        .set('telefone_celular', telefone_celular)
        .set('email_verificado', email_verificado)
        .set('telefone_celular_verificado', telefone_celular_verificado)
    })
  },
  // [REHYDRATE]: (state, action) => {
  //   const { payload } = action
  //   const userPayload = payload ? payload.user : null
  //   if (userPayload) {
  //     return new Base({
  //       errorMessage: userPayload.errorMessage,
  //       data: new User(userPayload.data)
  //     })
  //   }
  //   return initialState
  // },
  [USER_LOGOUT]: () => {
    return initialState
  }
}

export default function user(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
