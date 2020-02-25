import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import Employee from 'models/Employee'

const defaultValues = {
  recebivel: '',
  valor_previsto: 0,
  valor_descontado: 0,
  divergencia: '',
  contrato: '',
  funcionario: new Employee(),
}

export default class Discount extends BaseRecord(defaultValues, Discount) {
  constructor(values) {
    super({
      ...values,
      funcionario: get(values, 'funcionario') ? new Employee(values.funcionario) : defaultValues.funcionario,
    })
  }

  getDifferenceValue() {
    const expectedValue = this.get('valor_previsto')
    const discountedValue = this.get('valor_descontado')
    return expectedValue - discountedValue
  }
}
