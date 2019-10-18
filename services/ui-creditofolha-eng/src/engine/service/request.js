import { setError, clearErrors } from 'actions/errors'

export default async function (payload) {
  const { getAccess, getDispatch, getHasNotCriticalError } = this.spy
  const { RESPONSE_TYPES, CONTENT_TYPES } = this.service
  const { bindPathParams } = this.helpers
  const { apiUrl } = this.configs

  const defaultContentType = 'application/json'

  const {
    path,
    method,
    body,
    cType,
    rType,
    header,
    externalPath,
    v3,
    queryParams,
    removeToken,
    pathParams,
  } = payload
  const isV3 = v3 ? 'v3/' : 'v2/'
  const contentType = cType || defaultContentType
  const responseType = rType || RESPONSE_TYPES.JSON
  const { access, userFunction } = getAccess()
  const headers = { ...header }
  const dispatch = getDispatch()
  let query = ''
  let url = ''

  const bindedPath = bindPathParams(pathParams, path)
  url = externalPath || `${ apiUrl }/${ isV3 }${ bindedPath }`

  if (contentType !== CONTENT_TYPES.MULTIPART) {
    headers['Content-Type'] = `${ contentType }`
  }

  if (v3) {
    headers['User-Funcao'] = userFunction
  }

  if (queryParams && Object.keys(queryParams).length > 0) {
    query = Object.keys(queryParams).reduce((result, key) => {
      if (!queryParams[key]) {
        return result
      }
      if (!result) {
        return `?${ key }=${ queryParams[key] }`
      }
      return `${ result }&${ key }=${ queryParams[key] }`
    }, '')
  }

  let transformedBody = body
  if (contentType === CONTENT_TYPES.JSON) {
    transformedBody = JSON.stringify(body)
  }

  if (!externalPath && !removeToken) {
    headers.Authorization = `Bearer ${ access }`
  }

  if (query && url.endsWith('/')) {
    url = `${ url }${ query }`
  } else if (query) {
    url = `${ url }/${ query }`
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body ? transformedBody : undefined,
  })

  const params = method === 'GET' ? pathParams : body

  if (response.status === 200 || response.status === 201) {
    const hasNotCriticalError = getHasNotCriticalError()
    if (hasNotCriticalError) {
      dispatch(clearErrors())
    }
    const responseBody = responseType === RESPONSE_TYPES.BLOB ? response.blob() : response.json()
    return responseBody
  }

  if (response.status === 204) {
    return null
  }

  if (response.status === 400) {
    const error = await response.json()
    dispatch(setError(404, error, false, null, params))
    throw error
  }

  if (response.status === 401) {
    const { error_description: errorDescription, message } = await response.json()
    throw (errorDescription || message)
  }

  if (response.status === 404) {
    const error = await response.json()
    dispatch(setError(404, error, false, null, params))
    throw error
  }

  const connectionError = [502, 503, 504]
  const permissionError = [403]

  if (connectionError.includes(response.status)) {
    const error = await response.json()
    dispatch(setError(505, error, true, null, params))
    throw error
  }

  if (permissionError.includes(response.status)) {
    const error = await response.json()
    dispatch(setError(401, error, true, null, params))
    throw error
  }

  const { error, sentry } = await response.json()
  dispatch(setError(500, error, true, sentry, params))
  throw error
}
