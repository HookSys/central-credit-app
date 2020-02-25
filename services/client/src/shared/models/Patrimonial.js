import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  patrimonio_imobiliario: '',
  historico: '',
  evolucao: '',
}

export default class Patrimonial extends BaseRecord(defaultValues, Patrimonial) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
