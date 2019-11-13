import { MODULE } from 'constants/types'
import { SvgImage, LazyLoading } from 'components'

import ROUTES from './routes'

const { AVAILABLE_IMAGES } = SvgImage
const AdminContainer = LazyLoading(() => import('pages/Admin'))

export default {
  NAME: 'Onidata Admin',
  THEME: 'default',
  ENTRY: '/admin',
  TYPE: MODULE,
  ICON: AVAILABLE_IMAGES.EMPLOYEE_ICON,
  FULL: AVAILABLE_IMAGES.EMPLOYEE_LOGO,
  CONTAINER: AdminContainer,
  ROUTES,
}
