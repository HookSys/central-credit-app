// @flow
import type { List } from 'immutable'
import type { TRUserProfile } from './UserProfile'

export type TUser = {
  +id: ?number,
  +email: ?String,
  +cpf: ?String,
  +firstName: ?String,
  +lastName: ?String,
  +isSuperAdmin: ?boolean,
  +profiles: ?List<TRUserProfile>,
}
