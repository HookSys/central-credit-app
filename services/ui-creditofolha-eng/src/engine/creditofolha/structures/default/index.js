import { DEFAULT } from 'engine/constants/types'
import { LazyLoading } from 'components'

import ROUTES from './routes'

const DefaultContainer = LazyLoading(() => import('pages/Default'))

export default {
  NAME: 'Crédito Folha',
  ENTRY: '/',
  TYPE: DEFAULT,
  CONTAINER: DefaultContainer,
  THEME: 'default',
  ROUTES,
}
