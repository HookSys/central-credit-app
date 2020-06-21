import { Map } from 'immutable'

export default class GenerateFactory {
  static createRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = values
    request = request.set('onlyPayments', values.get('onlyPayments') ? 'S' : 'N')
    return request
  }
}
