import { get } from 'lodash'
import { EEntityKeys } from 'constants/entity'
import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  permissoes: [],
  entidade_tipo: '',
  entidade_id: null,
  entidade_nome: '',
  identificador: ''
}

export default class UserEntity extends BaseRecord(defaultValues, UserEntity) {
  constructor(values) {
    const isEmployee = get(values, 'entidade_tipo', '') === EEntityKeys.EMPLOYEE
    const entityName =
      isEmployee && get(values, 'entidade_nome', '').match(/(\[\w*\])/g)

    super({
      ...values,
      entidade_nome:
        isEmployee && entityName && entityName.length > 0
          ? entityName[0].replace(/(\[|\])/g, '')
          : values.entidade_nome
    })
  }
}
