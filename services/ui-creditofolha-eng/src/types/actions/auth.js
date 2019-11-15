// @flow
import type { TAuthValues } from 'models/Auth'
import type { TAuthTypes } from 'constants/actionTypes'

export type AuthSuccessAction = {
  type: TAuthTypes;
  payload: $Shape<TAuthValues>;
}

export type AuthLogoutAction = {
  type: TAuthTypes;
}

export type AuthActions =
  | AuthSuccessAction
  | AuthLogoutAction
