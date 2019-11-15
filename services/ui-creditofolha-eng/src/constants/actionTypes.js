// @flow
export const prefix = '@@credito-folha/'

export const AuthTypes = {
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
}
export type TAuthTypes = $Values<typeof AuthTypes>
