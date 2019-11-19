/* eslint-disable no-use-before-define */
// @flow
import type { TState } from 'types'
import type { TAppSpinnerAction } from './App'
import type { TAuthLogoutAction, TAuthSuccessAction } from './Auth'
import type { TExceptionHandleAction } from './Exception'
import type { TSubmitAction, TChangeAction } from './ReduxForm'

export type TAction = TAppSpinnerAction
  | TAuthLogoutAction
  | TAuthSuccessAction
  | TExceptionHandleAction
  | TSubmitAction
  | TChangeAction

export type TDispatch = (action: TAction | TThunkAction | TPromiseAction) => any;
export type TGetState = () => TState;
export type TThunkAction = (dispatch: TDispatch, getState: TGetState, services: any) => any;
export type TPromiseAction = Promise<TAction | null>;

export type * from './App'
export type * from './Auth'
export type * from './Exception'
export type * from './ReduxForm'
