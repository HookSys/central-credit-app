import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  mes: '',
  valor: 0,
}

export default class Values extends BaseRecord(defaultValues, Values) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
