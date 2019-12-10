import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  id: null,
  cpf: null,
  nome: null,
  sobrenome: null,
  email: null,
  telefone_celular: null,
  is_active: null,
}

export default class Person extends BaseRecord(defaultValues, Person) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
