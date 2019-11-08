import BaseRecord from 'models/utils/BaseRecord'
import moment from 'moment'
import PaymentTypeFactory from 'factories/PaymentType'
import { get } from 'lodash'

const defaultValues = {
  pagamento_em: moment(),
  valor_pagamento: 0,
  forma_pagamento: '',
  dados_pagamento: PaymentTypeFactory.createPaymentType(),
  financeira: '',
}

export default class Payment extends BaseRecord(defaultValues, Payment) {
  constructor(values) {
    super({
      ...values,
      dados_pagamento: get(values, 'dados_pagamento')
        ? PaymentTypeFactory.createPaymentType(values.dados_pagamento)
        : defaultValues.dados_pagamento,
    })
  }
}
