import { toEntityList } from 'base/BaseList'
import BaseRecord from 'base/BaseRecord'
import UserEntity from 'models//UserEntity'
import UserTerms from 'models/UserTerms'

const defaultValues = {
  cpf: '',
  nome: 'd',
  sobrenome: '',
  email: 'd',
  last_login: null,
  funcoes: toEntityList(
    [
      {
        entidade_tipo: 'empresa',
        entidade_id: 1,
        entidade_nome: 'Central',
        identificador: '1'
      }
    ],
    UserEntity
  ),
  termos_de_uso: toEntityList([], UserTerms),
  telefone_celular: '',
  email_verificado: null,
  telefone_celular_verificado: null,
  selectedEntityId: 1,
  wasRecentlyCreated: false,
  useTermsAccepted: false,
  fullName: ''
}

export default class User extends BaseRecord(defaultValues, User) {
  constructor(values) {
    super({
      ...values,
      funcoes:
        values && values.funcoes
          ? toEntityList(values.funcoes, UserEntity)
          : defaultValues.funcoes,
      termos_de_uso:
        values && values.termos_de_uso
          ? toEntityList(values.termos_de_uso, UserTerms)
          : defaultValues.termos_de_uso,
      fullName: values
        ? `${values.nome} ${values.sobrenome}`
        : defaultValues.fullName,
      useTermsAccepted:
        values && values.termos_de_uso && values.termos_de_uso.length > 0
    })
  }

  getHiddenEmail() {
    const email = this.get('email')
    const [first, last] = email.split('@')
    return `${first.charAt(0)}***${last}`
  }

  isLoaded() {
    return this.get('email') && this.get('cpf')
  }

  getSelectedEntity() {
    const entities = this.get('funcoes')
    const selectedEntityId = this.get('selectedEntityId')
    if (selectedEntityId && entities.size > 0) {
      const entitieInx = entities.findIndex(
        entity => entity.get('identificador') === selectedEntityId
      )
      if (entitieInx >= 0) {
        return entities.get(entitieInx)
      }
    }

    return false
  }
}
