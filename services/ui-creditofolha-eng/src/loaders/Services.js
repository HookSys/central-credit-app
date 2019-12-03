/* eslint-disable no-unused-expressions */
// @flow
import axios from 'axios'
import { fromJS } from 'immutable'
import { CONTENT_TYPE, RESPONSE_TYPE } from 'constants/service'
import { EEntityKeys } from 'constants/entity'

import type { ResponseType, $AxiosXHR, Axios, $AxiosError } from 'axios'
import type { TLoader, TServicesLoader, TRequestPayload, TService, TCore } from 'types'
import type { ContentType } from 'constants/service'

import { ApiUrl } from 'configs'
import { create } from 'core/actions/exception'
import { userLogout } from 'core/actions/user'

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
    const getQueryString = (key: $Keys<R>, params: R, isFirst: boolean): string | boolean => {
      if (params[key]) {
        return `${ isFirst ? '?' : '&' }${ key }=${ params[key] }`
      }
      return ''
    }

    if (!queryParams || Object.keys(queryParams).length === 0) {
      return ''
    }
    return Object.keys(queryParams).reduce<string>((result, key) => {
      const param = getQueryString(key, queryParams, !result)
      return typeof param === 'string' ? `${ result }${ param }` : result
    }, '')
  }

  function onError<T, R>(response: $AxiosXHR<T, R>, params: T) {
    const { Redux: { store: { getState, dispatch } }, History, Entity }: TCore = AppCore
    const { status, data }: any = response

    const connectionErrors = [502, 503, 504]
    const permissionErrors = [403]
    const notFoundErrors = [400, 404]

    if (connectionErrors.includes(status)) {
      return dispatch(create(505, data, fromJS(params), true))
    }
    if (permissionErrors.includes(status)) {
      return dispatch(create(401, data, fromJS(params), true))
    }
    if (notFoundErrors.includes(status)) {
      return dispatch(create(404, data, fromJS(params)))
    }
    if (status === 401) {
      const isAuthenticated = getState().auth.get('authenticated')
      if (isAuthenticated) {
        const { entity: { pages } } = Entity[EEntityKeys.DEFAULT]
        return dispatch(userLogout()).then(() => History.push(pages.LOGIN))
      }

      return dispatch(create(401, data, fromJS(params)))
    }

    const { sentry, error } = data
    return dispatch(create(500, error, fromJS(params), true, sentry))
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
