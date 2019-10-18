import reduxLogger from './reduxLogger'
import bindPathParams from './bindPathParams'
import getUrl from './getUrl'

export default (instance) => ({
  reduxLogger: reduxLogger.bind(instance),
  bindPathParams: bindPathParams.bind(instance),
  getUrl: getUrl.bind(instance),
})
