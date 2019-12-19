import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  id: null,
  mes_referencia: null,
  corte_em: null,
  vencimento_em: null,
}

export default class NextCut extends BaseRecord(defaultValues, NextCut) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
