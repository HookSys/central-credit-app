import BaseRecord from 'base/BaseRecord'
import moment from 'moment'
import { get } from 'lodash'

const defaultValues = {
  id: '',
  pago_em: moment(),
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
  estornado_em: moment(),
  processado_em: moment(),
}

export default class ReceivablePayment extends BaseRecord(defaultValues, ReceivablePayment) {
  constructor(values) {
    super({
      ...values,
      pago_em: get(values, 'pago_em') ? moment(values.pago_em) : defaultValues.pago_em,
      estornado_em: get(values, 'estornado_em') ? moment(values.estornado_em) : defaultValues.estornado_em,
      processado_em: get(values, 'processado_em') ? moment(values.processado_em) : defaultValues.processado_em,
    })
  }
}
