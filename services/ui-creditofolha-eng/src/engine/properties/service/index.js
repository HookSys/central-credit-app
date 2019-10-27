import request from './request'
import * as constants from './constants'

export default async function () {
  return {
    ...constants,
    request: request.bind(this),
  }
}
