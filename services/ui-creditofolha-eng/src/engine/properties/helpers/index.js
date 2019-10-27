import reduxLogger from './reduxLogger'
import bindPathParams from './bindPathParams'
import getUrl from './getUrl'
import getFirstViolatedPermission from './getFirstViolatedPermission'

export default async function () {
  return {
    reduxLogger: reduxLogger.bind(this),
    bindPathParams: bindPathParams.bind(this),
    getUrl: getUrl.bind(this),
    getFirstViolatedPermission: getFirstViolatedPermission.bind(this),
  }
}
