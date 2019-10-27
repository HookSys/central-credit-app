import refreshToken from './refreshToken'
import reduxEngine from './reduxEngine'

export default async function () {
  return {
    refreshToken: refreshToken.bind(this),
    reduxEngine: reduxEngine.bind(this),
  }
}
