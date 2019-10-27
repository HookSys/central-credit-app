import { MODULE } from 'engine/constants/types'
import { SvgImage, LazyLoading } from 'components'

import ROUTES from './routes'

const { AVAILABLE_IMAGES } = SvgImage
const CompanyContainer = LazyLoading(() => import('pages/Company'))

export default {
  NAME: 'Administrador',
  THEME: 'company',
  ENTRY: '/company',
  TYPE: MODULE,
  ICON: AVAILABLE_IMAGES.EMPLOYEE_ICON,
  FULL: AVAILABLE_IMAGES.EMPLOYEE_LOGO,
  CONTAINER: CompanyContainer,
  ROUTES,
}
