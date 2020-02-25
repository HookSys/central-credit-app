import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  id: '',
  pago_em: null,
  total_calculado: 0,
  desconto_antecipacao_calculado: 0,
  juros_calculado: 0,
  multa_calculado: 0,
  iof_calculado: 0,
  seguro_calculado: 0,
  total_pago: 0,
  multa_pago: 0,
  juros_pago: 0,
  iof_pago: 0,
  seguro_pago: 0,
  desconto_antecipacao_concedido: 0,
  desconto_concedido: 0,
  diferenca: 0,
  estornado_em: null,
  processado_em: null,
}

export default class ReceivablePayment extends BaseRecord(defaultValues, ReceivablePayment) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
