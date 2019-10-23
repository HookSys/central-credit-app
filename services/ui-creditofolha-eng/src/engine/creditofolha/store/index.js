import rootReducer from 'reducers'
import configure from './configure'

export default async function () {
  return {
    rootReducer,
    configure: configure.bind(this),
  }
}
