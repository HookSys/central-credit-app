// Reducer
import rootReducer from 'reducers'

// Methods
import configure from './configure'

export default (instance) => ({
  // Reducer
  rootReducer,

  // Methods
  configure: configure.bind(instance),
})
