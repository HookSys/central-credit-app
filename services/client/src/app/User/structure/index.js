// @flow
import { EProfileTypes } from 'constants/profile'
import { AUTH_REQUIRED } from 'constants/permission'
import Image from 'components/Image'

import UserProfileContainer from 'user/pages'
import UserRoutes from 'user/structure/routes'

import { getPagesFromRoutes } from 'helpers'

const { AVAILABLE_IMAGES } = Image

const UserProfile = {
  name: 'Representante',
  route: '/user',
  theme: 'user',
  type: EProfileTypes.MODULE,
  logo: {
    image: AVAILABLE_IMAGES.LOGO_FULL,
    className: 'bg-logo'
  },
  small: {
    image: AVAILABLE_IMAGES.LOGO_FULL,
    className: 'bg-logo'
  },
  permissions: [AUTH_REQUIRED],
  component: UserProfileContainer,
  routes: UserRoutes,
  pages: getPagesFromRoutes(UserRoutes, '/user')
}

export type TUserProfile = typeof UserProfile

export default UserProfile
