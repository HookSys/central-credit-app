import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  id: null,
  name: null,
  code: null,
  cnpj: null,
  totalCedentes: 0,
  totalSacados: 0,
  totalTitulos: 0,
  lastSync: null
}

export default class Company extends BaseRecord(defaultValues, 'Company') {
  constructor(values) {
    super({
      ...values
    })
  }
}
