// @flow
import type { TDefaultEntity } from 'default/structure'
import type { TDefaultRoutes } from 'default/structure/routes'

export type TDefaultPageProps = {
  entity: TDefaultEntity,
  parent: {
    route: $PropertyType<TDefaultEntity, 'route'>,
    component?: $PropertyType<TDefaultEntity, 'component'>,
    name: $PropertyType<TDefaultEntity, 'name'>,
    routes: $PropertyType<TDefaultEntity, 'routes'>,
    permissions: $PropertyType<TDefaultEntity, 'permissions'>,
  },
  route: $ElementType<TDefaultRoutes, $Keys<TDefaultRoutes>>,
}

export type TRegistrationModel = $ElementType<TDefaultRoutes, 'REGISTRATION'>

export type TRegistrationPageProps = {
  entity: TDefaultEntity,
  parent: $PropertyType<TDefaultRoutes, 'REGISTRATION'>,
  route: $ElementType<TDefaultRoutes, $Keys<TDefaultRoutes>>,
}
