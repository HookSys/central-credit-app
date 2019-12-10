import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  id: null,
  modalidades: null,
  nome_fantasia: null,
  logotipo: null,
}

export default class Financial extends BaseRecord(defaultValues, Financial) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
