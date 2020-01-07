import { Map } from 'immutable'
import Employee from 'models/Employee'

export default class EmployeeFactory {
  static createRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = values
    const employee = new Employee(request.toJS())
    if (request.get('telefone_celular')) {
      request = values.set('telefone_celular', `+55${ employee.getCleanValue('telefone_celular') }`)
    }
    if (request.get('referencia_telefone')) {
      request = values.set('referencia_telefone', `+55${ employee.getCleanValue('referencia_telefone') }`)
    }

    return request
  }
}
