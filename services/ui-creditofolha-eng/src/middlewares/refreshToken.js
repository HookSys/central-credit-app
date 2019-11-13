import { authRefresh } from 'actions/auth'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import { RefreshThreshold } from 'configs'

export default function ({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      const auth = getState().auth.toJS()
      if (auth.authenticated) {
        const { access, refreshTokenPromise } = auth
        const jwt = jwtDecode(access)
        const expiresDate = moment(jwt.exp * 1000)

        const diff = moment(Date.now()).valueOf() - expiresDate
        const timeRemaining = moment.duration(diff).asMinutes()
        if (timeRemaining >= RefreshThreshold) {
          if (!refreshTokenPromise) {
            return authRefresh(dispatch, getState).then(() => { next(action) })
          }
          if (refreshTokenPromise.then) {
            return refreshTokenPromise.then(() => {
              next(action)
            })
          }
        }
      }
    }
    return next(action)
  }
}
