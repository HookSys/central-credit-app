/* eslint-disable no-unused-expressions */
// @flow
import axios from 'axios'
import { CONTENT_TYPE, RESPONSE_TYPE } from 'constants/service'

import type { ResponseType, $AxiosXHR, Axios, $AxiosError } from 'axios'
import type { TLoader, TServicesLoader, TRequestPayload, TService, TCore } from 'types'
import type { ContentType } from 'constants/service'

import { ApiUrl } from 'configs'
import { handle } from 'core/actions/exception'

function Services(): TLoader<TServicesLoader> {
  const AppCore: TCore = this

  function bindPathParams<R: Object>(
    pathParams: ?R,
    path: string
  ): string {
    if (!pathParams) {
      return path
    }
    return Object.keys(pathParams).reduce((result, key) => {
      return result.replace(`:${ key }`, pathParams[key])
    }, path)
  }

  function bindQueryParams<R: Object>(
    queryParams: ?R
  ) {
    const getQueryString = (key: $Keys<R>, params: R, isFirst: boolean): string | boolean => (
      params[key] && `${ isFirst ? '?' : '&' }${ key }=${ params[key] }`
    )
    if (!queryParams || Object.keys(queryParams).length === 0) {
      return ''
    }
    return Object.keys(queryParams).reduce<string>((result, key) => {
      const param = getQueryString(key, queryParams, !!result)
      return typeof param === 'string' ? `${ result }${ param }` : result
    }, '')
  }

  function onError<T, R>(response: $AxiosXHR<T, R>, params: T) {
    const { Redux: { store: { dispatch } } }: TCore = AppCore
    dispatch(handle<T, R>(response, params))
  }

  const createService = (instance: Axios, handlingError: boolean = false): TService => {
    return function<T, R> (payload: TRequestPayload<T>): Promise<any> {
      const {
        path,
        pathParams,
        queryParams,
        method,
        body,
        cType,
        rType,
      } = payload

      const headers: Object = {}
      const contentType: ContentType = cType || CONTENT_TYPE.JSON
      const responseType: ResponseType = rType || RESPONSE_TYPE.JSON

      if (contentType !== CONTENT_TYPE.MULTIPART) {
        headers['Content-Type'] = `${ contentType }`
      }

      const bindedQuery = bindQueryParams<R>(queryParams)
      const bindedPath = bindPathParams<R>(pathParams, path)
      // const transformedBody: T = contentType !== CONTENT_TYPE.JSON ? JSON.stringify(body) : body

      return new Promise(async (resolve, reject) => {
        try {
          const response: $AxiosXHR<T, R> = await instance<T, R>({
            method,
            url: `${ bindedPath }${ bindedQuery }`,
            data: body,
            responseType,
            headers,
          })

          const { data } = response
          resolve(data)
        } catch (error) {
          if (handlingError && error && error.response) {
            const { response }: $AxiosError<T, R> = error
            const params = method === 'GET' ? pathParams : body
            onError(response, params)
          }
          reject()
        }
      })
    }
  }

  return {
    load: async () => {
      if (!ApiUrl) {
        throw new Error('[SERVICES]: ApiURL not defined')
      }

      const apiV2 = await axios.create({
        baseURL: `${ ApiUrl }/v2`,
        transformRequest: [(data, headers) => {
          const { Redux: { store: { getState } } }: TCore = this
          const access: ?string = getState().auth.get('access')
          if (access && headers) {
            // eslint-disable-next-line no-param-reassign
            headers['Authorization'] = `Bearer ${ access }`
          }

          return JSON.stringify(data)
        }],
      })

      const apiV3 = await axios.create({
        baseURL: `${ ApiUrl }/v3`,
        transformRequest: [(data, headers) => {
          const { Redux: { store: { getState } } }: TCore = this
          const access: ?string = getState().auth.get('access')

          if (access && headers) {
            // eslint-disable-next-line no-param-reassign
            headers['Authorization'] = `Bearer ${ access }`
          }

          const entity: ?Object = getState().user.get('data').getSelectedEntity()
          const userFunction: ?string = !entity ? null : entity.get('identificador')
          if (headers) {
            // eslint-disable-next-line no-param-reassign
            headers['User-Funcao'] = userFunction
          }

          return JSON.stringify(data)
        }],
      })

      return {
        external: createService(axios.create()),
        apiV2: createService(apiV2, true),
        apiV3: createService(apiV3, true),
      }
    },
  }
}

export default Services
