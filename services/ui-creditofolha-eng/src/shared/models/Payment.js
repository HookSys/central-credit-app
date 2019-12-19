import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  agencia: null,
  agencia_dac: null,
  banco: null,
  banco_nome: null,
  cliente_desde: null,
  conta: null,
  conta_dac: null,
  cpf_responsavel: null,
  cnpj_responsavel: null,
  praca: null,
  tipo: null,
}

export default class Payment extends BaseRecord(defaultValues, Payment) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
