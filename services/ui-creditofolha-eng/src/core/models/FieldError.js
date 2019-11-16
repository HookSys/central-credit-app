import BaseRecord from 'base/BaseRecord'
import { fromJS } from 'immutable'

const defaultValues = {
  path: '',
  error: '',
  nonFieldError: false,
  objectError: false,
  formId: null,
}

export default class FieldError extends BaseRecord(defaultValues, FieldError) {
  constructor(values) {
    super({
      ...values,
      error: values && values.error
        ? fromJS(values.error) : defaultValues.error,
    })
  }
}
