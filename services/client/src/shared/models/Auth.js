/* eslint-disable no-useless-constructor */
// @flow
import BaseRecord from 'base/BaseRecord'
import type { TAuthValues } from 'core/types'

const defaultValues: TAuthValues = {
  authenticated: false,
  token: '',
  refreshTokenPromise: null,
  errors: null
}

export default class Auth extends BaseRecord<TAuthValues>(
  defaultValues,
  'Auth'
) {
  constructor(values: TAuthValues) {
    super(values)
  }
}
