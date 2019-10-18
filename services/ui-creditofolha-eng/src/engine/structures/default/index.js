import { DEFAULT } from 'engine/constants/types'
import ROUTES from 'engine/structures/default/routes'
import { LazyLoading } from 'components'

const DefaultContainer = LazyLoading(() => import('pages/Default'))

export default {
  NAME: 'Crédito Folha',
  ENTRY: '/',
  TYPE: DEFAULT,
  CONTAINER: DefaultContainer,
  THEME: 'default',
  ROUTES,
}
