// @flow
import React, { Fragment } from 'react'
import { useLocation, Redirect } from 'react-router-dom'

import type { TRoute, TEntityEntryModel, TEntityModel } from 'app/types'
import type { TDefaultRoutes } from 'app/entities/default/routes'

export type TDefaultEntity = TEntityModel<TDefaultRoutes>
export type TDefaultEntityEntry = TEntityEntryModel<TDefaultRoutes>

export type PageComponentModelProps<P: TRoute | TDefaultEntityEntry> = {
  entity: TDefaultEntity,
  route: TRoute,
  parent: P,
  children?: any
}

type TDefaultContainerProps = {
  children: any,
  entity: TDefaultEntity,
}
const DefaultContainer = (
  { entity, children }: TDefaultContainerProps
) => {
  const location = useLocation()
  const { entry, entry: { routes } } = entity

  if (location.pathname === entry.route) {
    return (
      <Redirect to={ routes.LOGIN.route } />
    )
  }
  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

export default DefaultContainer
