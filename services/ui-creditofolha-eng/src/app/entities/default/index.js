// @flow
import { EEntityTypes } from 'constants/entity'
import type { TEntity } from 'app/types'

import DefaultEntityContainer from 'pages/Default'
import DefaultRoutes from 'app/entities/default/routes'

const DefaultEntity: TEntity = {
  theme: 'Default',
  type: EEntityTypes.DEFAULT,
  entry: {
    name: 'Crédito Folha',
    route: '/',
    permissions: [],
    component: DefaultEntityContainer,
    routes: DefaultRoutes,
  },
}

export default DefaultEntity
