// @flow
import type { Method, ResponseType } from 'axios'
import type { ContentType } from 'constants/service'

export type RequestPayload = {
  path: string,
  pathParams?: Object,
  queryParams?: Object,
  method: Method,
  body?: any,
  cType?: ContentType,
  rType?: ResponseType,
}

export type Services = {
  external: (payload: RequestPayload) => Promise<any>,
  apiV2?: (payload: RequestPayload) => Promise<any>,
  apiV3?: (payload: RequestPayload) => Promise<any>,
}
