import { AVAILABLE_IMAGES } from 'components/Atoms/SvgImage'
import { MODULE } from 'engine/constants/types'
import ROUTES from 'engine/structures/company/routes'
import { LazyLoading } from 'components'

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
