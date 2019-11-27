import Auth from 'core/models/Auth'

import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
} from 'core/constants/actionsType'

const REHYDRATE = 'persist/REHYDRATE'

const initialState = new Auth({
  authenticated: false,
  access: null,
  refresh: null,
  refreshTokenPromise: null,
  errors: null,
  userFunction: 0,
})

const actionsMap = {
  [AUTH_SUCCESS]: (state, action) => {
    const { access, refresh } = action.payload
    return state.merge({
      authenticated: true,
      access,
      refresh,
    })
  },
  [AUTH_LOGOUT]: () => {
    return initialState
  },
  [REHYDRATE]: (state, action) => {
    const { payload } = action
    const authPayload = payload ? payload.auth : null
    if (authPayload) {
      return new Auth({
        ...authPayload,
        refreshTokenPromise: null,
      })
    }
    return initialState
  },
}

export default function auth(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
