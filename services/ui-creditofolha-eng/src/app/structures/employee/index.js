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
    ICON: AVAILABLE_IMAGES.LOGO_WHITE_FULL,
    SMALL_CLASSNAME: 'bg-primary',
    SMALL_ICON: AVAILABLE_IMAGES.LOGO_WHITE_FULL,
  },
  VALIDATION: [
    PERMISSIONS.AUTH_REQUIRED({ redirectTo: '/login' }),
    PERMISSIONS.USE_TERMS_ACCEPTED({ redirectTo: '/use-terms' }),
    PERMISSIONS.SELECTED_PROFILE({ profile: MODULES.EMPLOYEE, redirectTo: '/profiles' }),
  ],
  ROUTES,
}
