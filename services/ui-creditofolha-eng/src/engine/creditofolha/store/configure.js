import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

export default function (initialState) {
  const getEnhancer = () => {
    const { refreshToken, reduxEngine } = this.middlewares
    const { reduxLogger } = this.helpers

    const recompose = this.isEnvProduction || typeof window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] === 'undefined'
      ? compose
      : window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']

    return this.isEnvProduction
      ? recompose(applyMiddleware(refreshToken, reduxEngine, thunk))
      : recompose(applyMiddleware(refreshToken, reduxEngine, thunk, reduxLogger))
  }

  const { persistConfig } = this.configs
  const { rootReducer } = this.store
  const enhancer = getEnhancer()

  const persistedReducer = persistReducer({ ...persistConfig, storage }, rootReducer)
  const store = createStore(persistedReducer, initialState, enhancer)
  const persistor = persistStore(store)

  this.store['store'] = store
  return { store, persistor }
}
