// @flow
import type { Permission } from 'constants/permission'

export type Validator = {
  validate(): boolean,
  action(): void,
}

export type Permissions = {
  validate: (validations: Array<Permission>) => void,
}
