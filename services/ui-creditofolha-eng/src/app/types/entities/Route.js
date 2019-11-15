/* eslint-disable no-use-before-define */
// @flow
import type { Permission } from 'constants/permission'
import type { TEntity, TEntityEntry } from 'app/types/entities'
import type { ComponentType } from 'react'

export type TRoute = {|
  route: string,
  name: string,
  icon?: () => Node,
  permissions?: Array<Permission>,
  isFeedback?: boolean,
  component?: TRouteComponent,
  routes?: TRoutes,
|}

export type PageComponentProps = {
  entity: TEntity,
  route: TRoute,
  parent: TRoute | TEntityEntry,
  children?: any
}

export type TRouteComponent = ComponentType<PageComponentProps>

export type TRoutes = {
  [key: string]: TRoute
}
