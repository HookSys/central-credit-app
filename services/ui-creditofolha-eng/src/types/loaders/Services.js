// @flow
import type { Method, ResponseType } from 'axios'
import type { ContentType } from 'constants/service'

export type TRequestPayload = {
  path: string,
  pathParams?: Object,
  queryParams?: Object,
  method: Method,
  body?: any,
  cType?: ContentType,
  rType?: ResponseType,
}

export type TServicesLoader = {
  external: (payload: TRequestPayload) => Promise<any>,
  apiV2?: (payload: TRequestPayload) => Promise<any>,
  apiV3?: (payload: TRequestPayload) => Promise<any>,
}
