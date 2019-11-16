// @flow
import { EEntityTypes } from 'constants/entity'
import { AUTH_REQUIRED } from 'components/Permissions'
import { SvgImage } from 'components/SvgImage'

import CompanyEntityContainer from 'company/pages'
import CompanyRoutes from 'company/structure/routes'

const { AVAILABLE_IMAGES } = SvgImage

const CompanyEntity = {
  name: 'Administrador',
  route: '/company',
  theme: 'company',
  type: EEntityTypes.MODULE,
  logo: {
    svg: AVAILABLE_IMAGES.LOGO_WHITE_FULL,
    className: 'bg-primary',
  },
  small: {
    svg: AVAILABLE_IMAGES.LOGO_WHITE_FULL,
    className: 'bg-primary',
  },
  permissions: [AUTH_REQUIRED],
  component: CompanyEntityContainer,
  routes: CompanyRoutes,
}

export type TCompanyEntity = typeof CompanyEntity

export default CompanyEntity
