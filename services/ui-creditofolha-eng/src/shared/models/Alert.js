import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  entidade_tipo: null,
  entidade_id: null,
  tipo: null,
  created_at: null,
  titulo: null,
  mensagem: null,
}

export default class Alert extends BaseRecord(defaultValues, Alert) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
