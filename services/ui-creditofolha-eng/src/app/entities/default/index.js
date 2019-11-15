// @flow
import { EEntityTypes } from 'constants/entity'

import DefaultEntityContainer from 'pages/Default'
import DefaultRoutes from 'app/entities/default/routes'
// import type { TDefaultModel } from 'app/entities/default/types'
import type { TEntity } from 'app/entities/types'

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
