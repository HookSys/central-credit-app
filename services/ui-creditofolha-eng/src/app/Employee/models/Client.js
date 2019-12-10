import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import Address from 'core/models/Address'
import Document from 'core/models/Document'
import Person from 'employee/models/Person'

const defaultValues = {
  pessoa: new Person(),
  sexo: null,
  dependentes: null,
  endereco: new Address(),
  documento: new Document(),
  nascimento: null,
  naturalidade: null,
  nacionalidade: null,
  nascimento_uf: null,
  estado_civil: null,
  referencia_telefone: null,
  referencia_nome: null,
  referencia_parentesco: null,
  nome_mae: null,
  nome_pai: null,
}

export default class Client extends BaseRecord(defaultValues, Client) {
  constructor(values) {
    super({
      ...values,
      endereco: get(values, 'endereco') ? new Address(values.endereco) : defaultValues.endereco,
      documento: get(values, 'documento') ? new Document(values.documento) : defaultValues.documento,
      pessoa: get(values, 'pessoa') ? new Person(values.pessoa) : defaultValues.pessoa,
    })
  }
}
