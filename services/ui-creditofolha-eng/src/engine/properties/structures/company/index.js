import { MODULE } from 'engine/constants/types'
import MODULES from 'engine/constants/modules'
import PERMISSIONS from 'engine/constants/permissions'

import { SvgImage, LazyLoading } from 'components'
import { Business } from '@material-ui/icons'

import ROUTES from './routes'

const { AVAILABLE_IMAGES } = SvgImage
const CompanyContainer = LazyLoading(() => import('pages/Company'))

export default {
  NAME: 'Administrador',
  THEME: 'company',
  ENTRY: '/company',
  TYPE: MODULE,
  CLASSNAME: 'bg-company text-white',
  ICON: Business,
  CONTAINER: CompanyContainer,
  LOGO: {
    CLASSNAME: 'bg-primary',
    ICON: AVAILABLE_IMAGES.LOGO_WHITE_FULL,
    SMALL_CLASSNAME: 'bg-primary',
    SMALL_ICON: AVAILABLE_IMAGES.LOGO_WHITE_FULL,
  },
  VALIDATION: [
    PERMISSIONS.AUTH_REQUIRED({ redirectTo: '/login' }),
    PERMISSIONS.USE_TERMS_ACCEPTED({ redirectTo: '/use-terms' }),
    PERMISSIONS.SELECTED_PROFILE({ profile: MODULES.COMPANY, redirectTo: '/profiles' })
  ],
  ROUTES,
}
