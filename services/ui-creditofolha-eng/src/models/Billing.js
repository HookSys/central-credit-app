import { get } from 'lodash'
import { List } from 'immutable'
import Values from 'models/Values'
import BaseRecord from 'models/utils/BaseRecord'
import { toEntityList } from 'models/utils/BaseList'

const defaultValues = {
  ano: '',
  valores: '',
}

export default class Billing extends BaseRecord(defaultValues, Billing) {
  constructor(values) {
    super({
      ...values,
      valores: get(values, 'valores', '') instanceof Array ? toEntityList(values.valores, Values) : new List(),
    })
  }
}
