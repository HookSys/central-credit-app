import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  cpf: 0,
  sobrenome: '',
  nome: '',
}

export default class Spouse extends BaseRecord(defaultValues, Spouse) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
