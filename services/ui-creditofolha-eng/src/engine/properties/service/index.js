/* eslint-disable no-param-reassign */
import axios from 'axios'
import { setError } from 'actions/errors'
import { createService } from './createService'

export default async function () {
  const { apiUrl } = this.configs

  const apiV2 = axios.create({
    baseURL: `${ apiUrl }/v2`,
    transformRequest: [(data, headers) => {
      const { store: { getState } } = this.store
      const access = getState().auth.get('access')

      if (access) {
        headers['Authorization'] = `Bearer ${ access }`
      }

      return JSON.stringify(data)
    }],
  })

  const apiV3 = axios.create({
    baseURL: `${ apiUrl }/v3`,
    transformRequest: [(data, headers) => {
      const { store: { getState } } = this.store
      const access = getState().auth.get('access')

      if (access) {
        headers['Authorization'] = `Bearer ${ access }`
      }

      const userFunction = getState().auth.get('userFunction')
      headers['User-Funcao'] = userFunction

      return JSON.stringify(data)
    }],
  })

  const onError = async (response, params) => {
    const { store: { dispatch } } = this.store
    const { status, data } = response

    const connectionErrors = [502, 503, 504]
    const permissionErrors = [403]
    const notFoundErrors = [400, 404]

    if (connectionErrors.includes(status)) {
      return dispatch(setError(505, data, true, null, params))
    }
    if (permissionErrors.includes(status)) {
      return dispatch(setError(401, data, true, null, params))
    }
    if (notFoundErrors.includes(status)) {
      return dispatch(setError(404, data, false, null, params))
    }
    if (status === 401) {
      return dispatch(setError(401, data, false, null, params))
    }

    const { sentry, error } = data
    return dispatch(setError(500, error, true, sentry, params))
  }

  return {
    apiV2: createService.call(this, apiV2, onError),
    apiV3: createService.call(this, apiV3, onError),
    external: createService.call(this, axios.create()),
  }
}
