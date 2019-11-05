import { RESPONSE_TYPES, CONTENT_TYPES } from 'engine/constants/service'
import { bindPathParams, bindQueryParams } from 'helpers'

export function createService(instance, onError) {
  return async function request(payload) {
    const {
      path,
      pathParams,
      queryParams,
      method,
      body,
      cType,
      rType,
    } = payload

    const headers = {}
    const contentType = cType || CONTENT_TYPES.JSON
    const responseType = rType || RESPONSE_TYPES.JSON

    if (contentType !== CONTENT_TYPES.MULTIPART) {
      headers['Content-Type'] = `${ contentType }`
    }

    const bindedQuery = bindQueryParams(queryParams)
    const bindedPath = bindPathParams(pathParams, path)
    const transformedBody = contentType !== CONTENT_TYPES.JSON ? JSON.stringify(body) : body

    try {
      const response = await instance({
        method,
        url: `${ bindedPath }${ bindedQuery }`,
        data: transformedBody || undefined,
        responseType,
        headers,
      })

      const { data } = response
      return data
    } catch (error) {
      if (onError) {
        const params = method === 'GET' ? pathParams : body
        onError(error.response, params)
      }
      throw new Error(error)
    }
  }
}
