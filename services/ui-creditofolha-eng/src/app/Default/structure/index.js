// @flow
import { EEntityTypes } from 'constants/entity'

import DefaultEntityContainer from 'default/pages'
import DefaultRoutes from 'default/structure/routes'

const DefaultEntity = {
  name: 'Crédito Folha',
  route: '/',
  theme: 'Default',
  type: EEntityTypes.DEFAULT,
  component: DefaultEntityContainer,
  routes: DefaultRoutes,
}

export type TDefaultEntity = typeof DefaultEntity

export default DefaultEntity
