import BaseRecord from 'models/utils/BaseRecord'

const defaultValues = {
  id: null,
  identificador: '',
  razao_social: '',
  nome_fantasia: null,
  cnpj: 0,
  logotipo: '',
  userFunction: 0,
}

export default class Financial extends BaseRecord(defaultValues, Financial) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
