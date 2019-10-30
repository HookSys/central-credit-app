import { MODULE } from 'engine/constants/types'
import { SvgImage, LazyLoading } from 'components'
import PERMISSIONS from 'engine/constants/permissions'
import MODULES from 'engine/constants/modules'

import ROUTES from './routes'

const { AVAILABLE_IMAGES } = SvgImage
const EmployeeContainer = LazyLoading(() => import('pages/Employee'))

export default {
  NAME: 'Funcionário',
  THEME: 'employee',
  ENTRY: '/employee',
  TYPE: MODULE,
  CONTAINER: EmployeeContainer,
  LOGO: {
    CLASSNAME: 'bg-primary',
    ICON: AVAILABLE_IMAGES.EMPLOYEE_LOGO,
  },
  VALIDATION: [
    PERMISSIONS.AUTH_REQUIRED({ redirectTo: '/login' }),
    PERMISSIONS.SELECTED_PROFILE({ profile: MODULES.EMPLOYEE, redirectTo: '/profiles' })
  ],
  ROUTES,
}
