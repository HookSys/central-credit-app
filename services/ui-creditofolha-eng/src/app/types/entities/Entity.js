/* eslint-disable no-use-before-define */
// @flow
import type { TEntityTypes } from 'constants/entity'
import type { Permission } from 'constants/permission'
import type { ComponentType, Element } from 'react'
import type { TRoutes } from 'app/types/entities'
import type { TDefaultRoutes } from 'app/entities/default/routes'
import type { TCompanyRoutes } from 'app/entities/company/routes'

export type TEntityLogo = {|
  svg: string,
  className?: string,
|}

export type TEntityEntryModel<R: TDefaultRoutes | TCompanyRoutes> = {|
  name: string,
  route: string,
  permissions: Array<Permission>,
  component: TEntityComponentType,
  routes: R
|}

export type TEntityModel<R: TDefaultRoutes | TCompanyRoutes> = {|
  theme: string,
  type: TEntityTypes,
  entry: TEntityEntryModel<R>,
  logo?: TEntityLogo,
  small?: TEntityLogo,
|}

export type TEntityEntry = {|
  name: string,
  route: string,
  permissions: Array<Permission>,
  component: TEntityComponentType,
  routes: TRoutes
|}

export type TEntity = {|
  theme: string,
  type: TEntityTypes,
  entry: TEntityEntry,
  logo?: TEntityLogo,
  small?: TEntityLogo,
|}

export type TEntityInstance = {|
  id: TEntityTypes,
  entity: TEntity,
  element: Element<TEntityElementType>,
|}

export type TEntityInstances = {
  [key: TEntityTypes]: TEntityInstance,
}

export type TEntityComponentProps<E: TEntityModel<TDefaultRoutes | TCompanyRoutes> | TEntity> = {
  entity: E,
  children: any,
}

export type TEntityComponentType = ComponentType<TEntityComponentProps<TEntity>>
export type TEntityElementType = ComponentType<{ entity: TEntity, children: Element<any> }>
