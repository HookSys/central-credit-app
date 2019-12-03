import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import Address from 'company/models/Address'

const defaultValues = {
  id: '',
  razao_social: '',
  nome_fantasia: null,
  cnpj: 0,
  endereco: new Address(),
  ramo_atividade: '',
  num_funcionarios: 0,
}

export default class Company extends BaseRecord(defaultValues, Company) {
  constructor(values) {
    super({
      ...values,
      endereco: get(values, 'endereco') ? new Address(values.endereco) : new Address(),
    })
  }
}
