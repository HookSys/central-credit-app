import refreshToken from './refreshToken'
import reduxEngine from './reduxEngine'
import reduxLogger from './reduxLogger'

export default async function () {
  return {
    refreshToken: refreshToken.bind(this),
    reduxEngine: reduxEngine.bind(this),
    reduxLogger: reduxLogger.bind(this),
  }
}
