/* eslint-disable no-use-before-define */
// @flow
import type { Permission } from 'constants/permission'
import type { TEntity } from 'types/entities'
import type { ComponentType } from 'react'

export type TRoute = {
  route: string,
  name: string,
  icon?: () => Node,
  permissions?: Array<Permission>,
  isFeedback?: boolean,
  component?: ComponentType<{
    entity: TEntity,
    route: TRoute,
    parent: TRoute,
    children?: any
  }>,
  routes?: TRoutes,
}

export type TRoutes = {
  [key: string]: TRoute
}
