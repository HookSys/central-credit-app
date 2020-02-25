import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  uf: '',
  cidade: '',
  pais: '',
  residencia_tipo: '',
  residencia_tempo: '',
  foto: '',
}

export default class Address extends BaseRecord(defaultValues, Address) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
