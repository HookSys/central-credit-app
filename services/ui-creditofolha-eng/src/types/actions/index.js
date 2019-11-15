/* eslint-disable no-use-before-define */
// @flow
import type { AuthActions } from './auth'

type Action = {
  ...AuthActions,
}

export type * from './auth'
export type GetState = () => any
export type PromiseAction = Promise<Action>
export type ThunkAction = (dispatch: Dispatch, getState: GetState, service: any) => any
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any
