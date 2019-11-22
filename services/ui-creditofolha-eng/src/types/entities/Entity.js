/* eslint-disable no-use-before-define */
// @flow
import type { TEntityTypes } from 'constants/entity'
import type { Element, ComponentType } from 'react'
import type { Permission } from 'constants/permission'
import type { TRoutes } from 'types'

export type TEntityLogo = {|
  svg: string,
  className?: string,
|}

export type TPages = {
  [key: string]: string,
}

export type TEntity = {
  name: string,
  route: string,
  theme: string,
  type: TEntityTypes,
  component: TEntityComponent<TEntity>,
  permissions?: Array<Permission>,
  routes: TRoutes,
  logo?: TEntityLogo,
  pages: TPages,
  small?: TEntityLogo,
}

export type TEntityComponent<E> = ComponentType<{
  children: any,
  entity: E,
}>

export type TEntityInstance = {|
  id: TEntityTypes,
  entity: TEntity,
  element: Element<ComponentType<{ entity: TEntity, children: Element<any> }>>,
|}

export type TEntityInstances = {
  [key: TEntityTypes]: TEntityInstance,
}
