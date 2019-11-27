// @flow
import { EEntityTypes } from 'constants/entity'
import { AUTH_REQUIRED } from 'constants/permission'
import SvgImage from 'components/SvgImage'

import EmployeeEntityContainer from 'employee/pages'
import EmployeeRoutes from 'employee/structure/routes'

import { getPagesFromRoutes } from 'helpers'

const { AVAILABLE_IMAGES } = SvgImage

const EmployeeEntity = {
  name: 'Funcionário',
  route: '/employee',
  theme: 'employee',
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
  component: EmployeeEntityContainer,
  routes: EmployeeRoutes,
  pages: getPagesFromRoutes(EmployeeRoutes, '/employee'),
}

export type TEmployeeEntity = typeof EmployeeEntity

export default EmployeeEntity
