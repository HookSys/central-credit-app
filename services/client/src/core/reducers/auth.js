import Auth from 'models/Auth'

import { AUTH_LOGOUT, AUTH_SUCCESS } from 'core/constants/actionsType'

const REHYDRATE = 'persist/REHYDRATE'

const initialState = new Auth({
  authenticated: false,
  token: null,
  refreshTokenPromise: null,
  errors: null
})

const actionsMap = {
  [AUTH_SUCCESS]: (state, action) => {
    const { token } = action.payload
    return state.merge({
      authenticated: true,
      token
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
        refreshTokenPromise: null
      })
    }
    return initialState
  }
}

export default function auth(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
