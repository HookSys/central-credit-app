import BaseRecord from './utils/BaseRecord'

const defaultValues = {
  ja_trabalha: false,
  ja_trabalhou: false,
  banco_conveniado: '',
  taxa_12: 0,
  taxa_24: 0,
  taxa_36: 0,
  taxa_48: 0,
  detalhes: '',
}

export default class ConsignedHistory extends BaseRecord(defaultValues, ConsignedHistory) {
  constructor(values) {
    super({
      ...values,
      ja_trabalhou: values && !values.ja_trabalha && values.detalhes && values.detalhes !== '',
    })
  }
}
