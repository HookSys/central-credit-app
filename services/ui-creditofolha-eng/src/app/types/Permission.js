// @flow
export type Permission = {
  validate(): boolean,
  action(): void,
}

export type Permissions = {
  validate: (validations: Array<any>) => void,
}
