import { get } from 'lodash'
import { toEntityList } from 'models/utils/BaseList'
import BaseRecord from 'models/utils/BaseRecord'
import Address from 'models/Address'
import Contact from 'models/Contact'

const defaultValues = {
  id: '',
  status: '',
  razao_social: '',
  nome_fantasia: null,
  cnpj: 0,
  endereco: new Address(),
  ramo_atividade: '',
  num_funcionarios: 0,
  contatos: toEntityList([], Contact),
}

export default class Company extends BaseRecord(defaultValues, Company) {
  constructor(values) {
    super({
      ...values,
      endereco: get(values, 'endereco') ? new Address(values.endereco) : new Address(),
      contatos: get(values, 'contatos')
        ? toEntityList(values.contatos, Contact) : defaultValues.contatos,
    })
  }
}
