// @flow
import BaseRecord from 'base/BaseRecord'
import { Map } from 'immutable'
import type { TUserProfile } from './types/UserProfile'

const defaultValues: TUserProfile = {
  id: null,
  name: null,
  company: null,
  type: null
}

export default class UserProfile extends BaseRecord<TUserProfile>(defaultValues, 'UserProfile') {
  constructor(values: Object) {
    super({
      ...values
    })
  }

  getAsCompany(): Object {
    return Map({
      id: this.get('id'),
      name: this.get('name'),
      code: this.get('company')
    })
  }
}
