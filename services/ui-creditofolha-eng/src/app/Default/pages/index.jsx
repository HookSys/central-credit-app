// @flow
import React, { Fragment } from 'react'
import { useLocation, Redirect } from 'react-router-dom'

import type { TEntityComponent } from 'types'
import type { TDefaultEntity } from 'default/structure'

type TDefaultContainerProps = {
  children: any,
  entity: TDefaultEntity,
}
const DefaultContainer: TEntityComponent<TDefaultEntity> = ({
  entity,
  children,
}: TDefaultContainerProps) => {
  const location = useLocation()
  const { route, routes } = entity

  if (location.pathname === route) {
    return <Redirect to={ routes.LOGIN.route } />
  }
  return <Fragment>{children}</Fragment>
}

export default DefaultContainer
