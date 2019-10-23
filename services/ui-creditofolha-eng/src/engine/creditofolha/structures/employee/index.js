import { MODULE } from 'engine/constants/types'
import { SvgImage, LazyLoading } from 'components'

import ROUTES from './routes'

const { AVAILABLE_IMAGES } = SvgImage
const EmployeeContainer = LazyLoading(() => import('pages/Employee'))

export default {
  NAME: 'Funcionário',
  THEME: 'employee',
  ENTRY: '/employee',
  TYPE: MODULE,
  ICON: AVAILABLE_IMAGES.EMPLOYEE_ICON,
  FULL: AVAILABLE_IMAGES.EMPLOYEE_LOGO,
  CONTAINER: EmployeeContainer,
  ROUTES,
}
