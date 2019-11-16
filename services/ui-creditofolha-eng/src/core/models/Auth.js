/* eslint-disable no-useless-constructor */
// @flow
import BaseRecord from 'base/BaseRecord'

export type TAuthValues = {
  authenticated: boolean,
  access: ?string,
  refresh: ?string,
  refreshTokenPromise: ?Promise<any>,
  errors: any,
  userFunction: number,
}

const defaultValues: TAuthValues = {
  authenticated: false,
  access: null,
  refresh: null,
  refreshTokenPromise: null,
  errors: null,
  userFunction: 0,
}


export default class Auth extends BaseRecord<TAuthValues>(defaultValues, 'Auth') {
  constructor(values: TAuthValues) {
    super(values)
  }
}
