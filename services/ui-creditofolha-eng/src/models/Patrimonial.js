import BaseRecord from 'models/utils/BaseRecord'

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
