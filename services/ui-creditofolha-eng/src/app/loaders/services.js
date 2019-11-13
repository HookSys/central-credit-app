// @flow
import axios from 'axios'
import { CONTENT_TYPE, RESPONSE_TYPE } from 'constants/service'
import { bindPathParams, bindQueryParams } from 'helpers'

import type { ResponseType, $AxiosXHR, Axios } from 'axios'
import type { Loader, Services, RequestPayload, AppData } from 'app/types'
import type { ContentType } from 'constants/service'

import { ApiUrl } from 'configs'
import { handleError } from 'actions/errors'

function services(): Loader<Services> {
  const onError = (response, params) => {
    const { Redux: { store: { dispatch } } }: AppData = this
    dispatch(handleError(response, params))
  }

  const createService = (instance: Axios, handlingError: boolean = false) => {
    return async<R = any>(payload: RequestPayload): Promise<R> => {
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

      const bindedQuery: string = bindQueryParams(queryParams)
      const bindedPath: string = bindPathParams(pathParams, path)
      const transformedBody: any = contentType !== CONTENT_TYPE.JSON ? JSON.stringify(body) : body

      try {
        const response: $AxiosXHR<R> = await instance({
          method,
          url: `${ bindedPath }${ bindedQuery }`,
          data: transformedBody || undefined,
          responseType,
          headers,
        })

        const { data } = response
        return data
      } catch (error) {
        if (handlingError) {
          const params = method === 'GET' ? pathParams : body
          onError(error.response, params)
        }
        throw new Error(error)
      }
    }
  }

  return {
    load: async () => {
      const apiV2 = await axios.create({
        baseURL: `${ ApiUrl }/v2`,
        transformRequest: [(data, headers) => {
          const { Redux: { store: { getState } } }: AppData = this
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
          const { Redux: { store: { getState } } }: AppData = this
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

export default services
