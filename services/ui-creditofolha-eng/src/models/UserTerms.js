import BaseRecord from './utils/BaseRecord'

const defaultValues = {
  tipo: '',
  ip: '',
  browser: '',
  acordo_em: '',
  user: null,
}

export default class UserTerms extends BaseRecord(defaultValues, UserTerms) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
