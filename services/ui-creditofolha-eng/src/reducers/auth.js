import Auth from 'models/Auth'

import {
  DE_AUTH_SUCCESS,
  AUTH_ASYNC_SUCCESS,
  AUTH_REFRESH_ASYNC_START,
  AUTH_REFRESH_SUCCESS,
} from 'actions/auth'

const REHYDRATE = 'persist/REHYDRATE'

const initialState = new Auth()

const actionsMap = {
  [AUTH_ASYNC_SUCCESS]: (state, action) => {
    const { access, refresh } = action
    return state.merge({
      authenticated: true,
      access,
      refresh,
    })
  },
  [AUTH_REFRESH_ASYNC_START]: (state, action) => {
    return state.merge({
      refreshTokenPromise: action.refreshTokenPromise,
    })
  },
  [AUTH_REFRESH_SUCCESS]: (state, action) => {
    const { access } = action
    return state.merge({
      access,
      refreshTokenPromise: null,
    })
  },
  [DE_AUTH_SUCCESS]: () => {
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
