import BaseRecord from 'models/utils/BaseRecord'

const defaultValues = {
  agencia: '',
  agencia_dac: '',
  banco: '',
  banco_nome: '',
  cliente_desde: null,
  conta: '',
  conta_dac: '',
  cpf_responsavel: null,
  cnpj_responsavel: '',
  praca: null,
  tipo: '',
}

export default class Bank extends BaseRecord(defaultValues, Bank) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
