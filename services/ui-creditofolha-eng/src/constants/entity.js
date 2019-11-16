// @flow
export const EEntityTypes = {
  DEFAULT: 'default',
  MODULE: 'module',
}
export type TEntityTypes = $Values<typeof EEntityTypes>

export const EEntityKeys = {
  COMPANY: 'empresa',
  // EMPLOYEE: 'emprego',
  DEFAULT: 'default',
  // ADMIN: 'admin',
}
export type TEntityKeys = $Values<typeof EEntityKeys>
