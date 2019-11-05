import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { reduxLogger } from 'helpers'
import { routerMiddleware } from 'connected-react-router'

export default function (initialState) {
  const { history } = this.history

  const getEnhancer = () => {
    const { refreshToken, reduxEngine } = this.middlewares

    const recompose = this.isEnvProduction || typeof window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] === 'undefined'
      ? compose
      : window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']

    return this.isEnvProduction
      ? recompose(applyMiddleware(
        routerMiddleware(history),
        refreshToken,
        reduxEngine,
        thunk
      ))
      : recompose(applyMiddleware(
        routerMiddleware(history),
        refreshToken,
        reduxEngine,
        thunk,
        reduxLogger
      ))
  }

  const { persistConfig } = this.configs
  const { rootReducer } = this.store
  const enhancer = getEnhancer()

  const persistedReducer = persistReducer({ ...persistConfig, storage }, rootReducer(history))
  const store = createStore(persistedReducer, initialState, enhancer)
  const persistor = persistStore(store)

  this.store['store'] = store
  return { store, persistor }
}
