import request from './request'
import * as constants from './constants'

export default (instance) => ({
  ...constants,
  request: request.bind(instance),
})
