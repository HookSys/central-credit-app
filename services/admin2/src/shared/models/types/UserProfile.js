// @flow
import type { BaseRecordOf } from 'base/BaseRecord'

export type TUserProfile = {
  +id: ?string,
  +name: ?string,
  +company: ?string,
  +type: ?string,
}

export type TRUserProfile = BaseRecordOf<TUserProfile>
