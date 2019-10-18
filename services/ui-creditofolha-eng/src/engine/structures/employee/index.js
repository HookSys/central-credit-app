import { AVAILABLE_IMAGES } from 'components/Atoms/SvgImage'
import { MODULE } from 'engine/constants/types'
import ROUTES from 'engine/structures/employee/routes'
import { LazyLoading } from 'components'

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
