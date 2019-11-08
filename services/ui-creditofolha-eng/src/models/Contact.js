import BaseRecord from './utils/BaseRecord'

const defaultValues = {
  nome: '',
  setor: '',
  telefone: null,
  email: '',
}

export default class Contact extends BaseRecord(defaultValues, Contact) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
