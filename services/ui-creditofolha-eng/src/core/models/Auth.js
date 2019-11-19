/* eslint-disable no-useless-constructor */
// @flow
import BaseRecord from 'base/BaseRecord'
import type { TAuthValues } from 'core/types'

const defaultValues: TAuthValues = {
  authenticated: false,
  access: '',
  refresh: '',
  refreshTokenPromise: null,
  errors: null,
  userFunction: 0,
}

export default class Auth extends BaseRecord<TAuthValues>(defaultValues, 'Auth') {
  constructor(values: TAuthValues) {
    super(values)
  }
}
