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
    CLASSNAME: 'bg-white',
    ICON: AVAILABLE_IMAGES.LOGO_ALFA_FINANCEIRA,
    SMALL_CLASSNAME: 'bg-white',
    SMALL_ICON: AVAILABLE_IMAGES.ICON_ALFA_FINANCEIRA,
  },
  VALIDATION: [
    PERMISSIONS.AUTH_REQUIRED({ redirectTo: '/login' }),
    PERMISSIONS.SELECTED_PROFILE({ profile: MODULES.COMPANY, redirectTo: '/profiles' })
  ],
  ROUTES,
}
