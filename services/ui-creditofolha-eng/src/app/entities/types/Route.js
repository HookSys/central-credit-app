/* eslint-disable no-use-before-define */
// @flow
import type { Permission } from 'constants/permission'
import type { TEntity, TEntityEntry } from 'app/entities/types'
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

// export type TRoutePages = { [key: string]: TRoutePage }

// export type TRouteContainer<O: TRoutePages> = {|
//   ...TRouteBase,
//   routes: { [key: $Keys<O>]: $Values<O> },
//   component?: ComponentType<{ entity: TEntity, container: TRouteContainer<O> }>,
// |}

// function routeContainerParser(routes:
//  $Shape<$ElementType<TEntityEntry, 'routes'>>): ?TRouteContainer<TRoutePages> {
//   // eslint-disable-next-line no-restricted-syntax
//   for (const [, value] of routes.entries()) {
//     return value
//   }
//   return null
// }
// export type TRouteContainerParse = $NonMa
// ybeType<$Call<typeof routeContainerParser, $Shape<$ElementType<TEntityEntry, 'routes'>>>>

// function routePageParser(routes: $Shape<$ElementType<TEntityEntry, 'routes'>>): ?TRoutePage {
//   // eslint-disable-next-line no-restricted-syntax
//   for (const [, value] of routes.entries()) {
//     return value
//   }
//   return null
// }
// export type TRoutePageParse = $NonMaybeType
// <$Call<typeof routePageParser, $Shape<$ElementType<TEntityEntry, 'routes'>>>>

// type TRouteContainers = TRouteContainer<$Values<$ElementType<TEntityEntry, 'routes'>>>
// function routeContainers(routes: $ElementType<TEntityEntry, 'routes'>): ?TRouteContainers {
//   // eslint-disable-next-line no-restricted-syntax
//   for (const [, value] of routes.entries()) {
//     return value
//   }
//   return null
// }
// export type TRouteContainersT =
//  $Call<typeof routeContainers, $ElementType<TEntityEntry, 'routes'>>
