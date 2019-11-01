import BaseRecord from './utils/BaseRecord'
import { get } from 'lodash'
import MODULES from 'engine/constants/modules'

const defaultValues = {
  permissoes: [],
  entidade_tipo: '',
  entidade_id: null,
  entidade_nome: '',
}

export default class UserEntity extends BaseRecord(defaultValues, UserEntity) {
  constructor(values) {
    const entityType = get(values, 'entidade_tipo', '') === MODULES.EMPLOYEE

    super({
      ...values,
      entidade_nome: entityType ? get(values, 'entidade_nome', '').replace(/((\((\w)*\))|(\[(\w)*\]))*/g, '') : values.entidade_nome,
    })
  }
}
