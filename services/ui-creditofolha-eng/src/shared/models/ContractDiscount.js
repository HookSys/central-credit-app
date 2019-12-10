import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  recebivel: '',
  valor_previsto: 0,
  valor_descontado: 0,
  divergencia: '',
  contrato: '',
}

export default class ContractDiscount extends BaseRecord(defaultValues, ContractDiscount) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
