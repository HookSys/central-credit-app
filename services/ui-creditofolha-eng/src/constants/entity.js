// @flow
export const COMPANY = 'empresa'
export const EMPLOYEE = 'emprego'
export const DEFAULT = 'default'
export const ADMIN = 'admin'

const ENTITY = {
  COMPANY,
  EMPLOYEE,
  DEFAULT,
  ADMIN,
}

export type EntityKey = $Values<typeof ENTITY>
