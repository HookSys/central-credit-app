// @flow
import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import UserProfile from 'models/UserProfile'
import { EProfileKeys } from 'constants/profile'

import type { TUserProfile } from './types/UserProfile'
import type { TUser } from './types/User'

const defaultValues: TUser = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  cpf: null,
  isSuperAdmin: false,
  profiles: toEntityList([], UserProfile)
}

export default class User extends BaseRecord<TUser>(defaultValues, 'User') {
  constructor(values: Object) {
    let profiles: TUserProfile[] = values && values.companies ? values.companies.map(
      ({ id, name, code }) => ({ id, name, company: code, type: EProfileKeys.USER })
    ) : []

    if (values && values.isSuperAdmin) {
      profiles = [].concat([({ id: 'admin', name: 'Administrador', company: 'admin', type: EProfileKeys.ADMIN })], profiles)
    }

    if (values && values.profiles) {
      // eslint-disable-next-line prefer-destructuring
      profiles = values.profiles
    }

    super({
      ...values,
      profiles: toEntityList(
        profiles,
        UserProfile
      )
    })
  }
}
