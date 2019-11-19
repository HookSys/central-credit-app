// @flow
import type { AUTH_SUCCESS, AUTH_LOGOUT } from 'types/actionsType'
import type { TAuthLoginResponse } from 'core/types'

export type TAuthSuccessAction = {|
  type: AUTH_SUCCESS,
  payload: $Exact<TAuthLoginResponse>,
|}

export type TAuthLogoutAction = {|
  type: AUTH_LOGOUT,
|}
