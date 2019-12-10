import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  razao_social: '',
  cnpj: '',
  nacionalidade: '',
  porcentagem_capital: 0,
}

export default class PartnerParticipation extends BaseRecord(defaultValues, PartnerParticipation) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
