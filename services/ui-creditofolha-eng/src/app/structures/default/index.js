/* eslint-disable no-param-reassign */
// @flow
import { STRUCTURE_TYPES } from 'constants/structure'
import LazyLoading from 'components/LazyLoading'

import type { Structure } from 'app/types'
import defaultRoutes from './routes'

const DefaultContainer = LazyLoading(() => import('pages/Default'))

const DefaultStructure: Structure = {
  name: 'Crédito Folha',
  theme: 'default',
  entry: '/',
  type: STRUCTURE_TYPES.DEFAULT,
  component: DefaultContainer,
  routes: defaultRoutes,
  pages: { current: {} },
}

export default DefaultStructure
