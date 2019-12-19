// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from 'core/reducers'
import { IsEnvProduction, PersistConfig } from 'configs'

import type { TLoader, TReduxLoader, TCore } from 'types'
import type { Store } from 'redux'

import thunk from 'redux-thunk'
import reduxLogger from 'middlewares/reduxLogger'
// import refreshToken from 'middlewares/refreshToken'
import reduxService from 'middlewares/reduxService'
import { routerMiddleware } from 'connected-react-router/immutable'

function Redux(initialState?: Object): TLoader<TReduxLoader> {
  const getEnhancer = () => {
    const { History, Services }: TCore = this

    const recompose = IsEnvProduction || typeof window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] === 'undefined'
      ? compose
      : window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']

    return IsEnvProduction
      ? recompose(applyMiddleware(
        routerMiddleware(History),
        reduxService(Services),
        // refreshToken,
        thunk
      ))
      : recompose(applyMiddleware(
        routerMiddleware(History),
        reduxService(Services),
        // refreshToken,
        thunk,
        reduxLogger
      ))
  }

  return {
    load: async () => {
      const { History }: TCore = this
      const enhancer = getEnhancer()

      const persistedReducer = persistReducer({ ...PersistConfig, storage },
        rootReducer(History))
      const store: Store<any, any> = createStore(persistedReducer, initialState, enhancer)
      const persistor: any = persistStore(store)

      return {
        store,
        persistor,
      }
    },
  }
}

export default Redux
