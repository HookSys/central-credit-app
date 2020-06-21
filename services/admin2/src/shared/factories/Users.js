import { Map } from 'immutable'

export default class UsersFactory {
  static createRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = values
    request = request.remove('profiles')
    request = request.set('companies', values.get('profiles').filter((c) => c.get('id') !== 'admin'))
    return request
  }

  static editRequest(values) {
    if (!values) {
      return new Map()
    }
    let request = values
    request = request.remove('profiles')
    request = request.set('companies', values.get('profiles').filter((c) => c.get('id') !== 'admin'))
    return request
  }
}
