import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  nome: '',
  cpf: '',
  nacionalidade: '',
  cargo: '',
  data_inicio: '',
  porcentagem_capital: 0,
}

export default class Shareholder extends BaseRecord(defaultValues, Shareholder) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
