import BaseRecord from 'base/BaseRecord'
import { get } from 'lodash'
import moment from 'moment'

const defaultValues = {
  id: null,
  data: '',
  mensagem: '',
  usuario: '',
}

export default class PaymentLotComment extends BaseRecord(defaultValues, PaymentLotComment) {
  constructor(values) {
    super({
      ...values,
      data: get(values, 'data') ? moment(values.data) : defaultValues.pago_em,
    })
  }
}
