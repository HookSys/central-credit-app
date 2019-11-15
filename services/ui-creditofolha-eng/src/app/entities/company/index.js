// @flow
import { EEntityTypes } from 'constants/entity'
import { AUTH_REQUIRED } from 'components/Permissions'
import { SvgImage } from 'components/SvgImage'

import CompanyEntityContainer from 'pages/Company'
import CompanyRoutes from 'app/entities/company/routes'

import type { TEntity } from 'app/types'

const { AVAILABLE_IMAGES } = SvgImage

const CompanyEntity: TEntity = {
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
  entry: {
    name: 'Administrador',
    route: '/company',
    permissions: [AUTH_REQUIRED],
    component: CompanyEntityContainer,
    routes: CompanyRoutes,
  },
}

export default CompanyEntity
