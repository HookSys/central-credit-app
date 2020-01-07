import BaseRecord from 'base/BaseRecord'
import moment from 'moment'
import PaymentFactory from 'factories/Payment'
import { get } from 'lodash'

const defaultValues = {
  pagamento_em: moment(),
  valor_pagamento: 0,
  forma_de_pagamento: '',
  total_a_ser_pago: 0,
  dados_pagamento: PaymentFactory.createPaymentType(),
  financeira: '',
}

export default class Payment extends BaseRecord(defaultValues, Payment) {
  constructor(values) {
    super({
      ...values,
      dados_pagamento: get(values, 'dados_pagamento')
        ? PaymentFactory.createPaymentType(values.dados_pagamento)
        : defaultValues.dados_pagamento,
    })
  }
}
