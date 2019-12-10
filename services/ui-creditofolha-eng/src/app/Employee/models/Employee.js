import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import Payment from 'employee/models/Payment'

const defaultValues = {
  id: '',
  pagamento: new Payment(),
  empresa: null,
  status: '',
  matricula: '',
  admitido_em: '',
  cargo: '',
  salario_bruto: null,
  cliente: '',
}

export default class Employee extends BaseRecord(defaultValues, Employee) {
  constructor(values) {
    super({
      ...values,
      pagamento: get(values, 'pagamento') ? new Payment(values.pagamento) : defaultValues.pagamento,
    })
  }
}
