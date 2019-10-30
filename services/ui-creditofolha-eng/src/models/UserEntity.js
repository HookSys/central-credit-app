import BaseRecord from './utils/BaseRecord'

const defaultValues = {
  permissoes: [],
  entidade_tipo: '',
  entidade_id: null,
  entidade_nome: '',
}

export default class UserEntity extends BaseRecord(defaultValues, UserEntity) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
