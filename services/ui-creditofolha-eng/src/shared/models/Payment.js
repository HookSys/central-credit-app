import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  agencia: '-',
  agencia_dac: '',
  banco: '-',
  banco_nome: '-',
  cliente_desde: null,
  conta: '-',
  conta_dac: '',
  cpf_responsavel: null,
  cnpj_responsavel: '',
  praca: null,
  tipo: '-',
}

export default class Payment extends BaseRecord(defaultValues, Payment) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
