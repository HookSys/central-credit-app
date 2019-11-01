import { List } from 'immutable'
import { toEntityList } from 'models/utils/BaseList'
import BaseRecord from 'models/utils/BaseRecord'
import UserEntity from 'models/UserEntity'
import UserTerms from 'models/UserTerms'
import Engine from 'engine/main'

const defaultValues = {
  cpf: '',
  nome: '',
  sobrenome: '',
  email: '',
  last_login: null,
  funcoes: toEntityList([], UserEntity),
  termos_de_uso: toEntityList([], UserTerms),
  telefone_celular: '',
  email_verificado: null,
  telefone_celular_verificado: null,
  selectedEntityId: null,
  wasRecentlyCreated: false,
  useTermsAccepted: false,
  fullName: '',
}

export default class User extends BaseRecord(defaultValues, User) {
  constructor(values) {
    super({
      ...values,
      funcoes: values && values.funcoes
        ? toEntityList(values.funcoes, UserEntity) : defaultValues.funcoes,
      termos_de_uso: values && values.termos_de_uso
        ? toEntityList(values.termos_de_uso, UserTerms) : defaultValues.termos_de_uso,
      fullName: values ? `${ values.nome } ${ values.sobrenome }` : defaultValues.fullName,
    })
  }

  getHiddenEmail() {
    const email = this.get('email')
    const [first, last] = email.split('@')
    return `${ first.charAt(0) }***${ last }`
  }

  isLoaded() {
    return this.get('email') && this.get('cpf')
  }

  getSelectedEntity() {
    const entities = this.get('funcoes')
    const selectedEntityId = this.get('selectedEntityId')
    if (selectedEntityId && entities.size > 0) {
      const entitieInx = entities.findIndex((entity) => entity.get('entidade_id') === selectedEntityId)
      if (entitieInx >= 0) {
        return entities.get(entitieInx)
      }
    }

    return false
  }
}
